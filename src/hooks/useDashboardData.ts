import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Bill {
  id: string;
  bill_number: string;
  title: string;
  summary: string;
  status: string;
  priority: string;
  chamber: string;
  author: string;
  last_action: string;
  last_action_date: string;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
  contact_email: string;
  industry: string;
  status: string;
  created_at: string;
}

interface ClientBill extends Bill {
  client_bills: {
    position: string;
    tracking_reason: string;
    priority_override: string;
  };
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  bill_id?: string;
  bills?: {
    bill_number: string;
    title: string;
  };
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [bills, setBills] = useState<ClientBill[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch user's clients
      const { data: userClients, error: clientsError } = await supabase
        .from('user_clients')
        .select(`
          client_id,
          clients (
            id,
            name,
            contact_email,
            industry,
            status,
            created_at
          )
        `)
        .eq('user_id', user.id);

      if (clientsError) throw clientsError;

      const clientsData = userClients?.map(uc => uc.clients).filter(Boolean) as Client[];
      setClients(clientsData || []);

      if (clientsData?.length > 0) {
        const clientIds = clientsData.map(c => c.id);

        // Fetch bills tracked by user's clients
        const { data: clientBills, error: billsError } = await supabase
          .from('client_bills')
          .select(`
            position,
            tracking_reason,
            priority_override,
            bills (
              id,
              bill_number,
              title,
              summary,
              status,
              priority,
              chamber,
              author,
              last_action,
              last_action_date,
              created_at
            )
          `)
          .in('client_id', clientIds)
          .order('created_at', { ascending: false });

        if (billsError) throw billsError;

        const billsData = clientBills?.map(cb => ({
          ...cb.bills,
          client_bills: {
            position: cb.position,
            tracking_reason: cb.tracking_reason,
            priority_override: cb.priority_override
          }
        })).filter(bill => bill.id) as ClientBill[];

        setBills(billsData || []);
      }

      // Fetch user notifications
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select(`
          id,
          title,
          message,
          type,
          read,
          created_at,
          bill_id,
          bills (
            bill_number,
            title
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (notificationsError) throw notificationsError;
      setNotifications(notificationsData || []);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();

      // Set up real-time subscriptions
      const billsSubscription = supabase
        .channel('bills-changes')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'bills' 
        }, () => {
          fetchDashboardData();
        })
        .subscribe();

      const notificationsSubscription = supabase
        .channel('notifications-changes')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, () => {
          fetchDashboardData();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(billsSubscription);
        supabase.removeChannel(notificationsSubscription);
      };
    }
  }, [user]);

  return {
    bills,
    clients,
    notifications,
    loading,
    error,
    refetch: fetchDashboardData,
    markNotificationAsRead
  };
};