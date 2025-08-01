import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  Filter,
  Calendar,
  User,
  Building,
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

interface Bill {
  id: string;
  bill_number: string;
  title: string;
  summary?: string;
  status: string;
  priority: string;
  chamber?: string;
  author?: string;
  last_action?: string;
  last_action_date?: string;
  created_at: string;
  client_bills: {
    position: string;
    tracking_reason: string;
    priority_override?: string;
  };
}

interface LegislationTrackingProps {
  bills: Bill[];
  loading: boolean;
  onTrackBill?: (billData: any) => void;
  onViewBill?: (billId: string) => void;
  onUpdatePosition?: (billId: string, position: string) => void;
}

const LegislationTracking: React.FC<LegislationTrackingProps> = ({
  bills,
  loading,
  onTrackBill,
  onViewBill,
  onUpdatePosition
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [isTrackDialogOpen, setIsTrackDialogOpen] = useState(false);
  const [newBill, setNewBill] = useState({
    bill_number: '',
    title: '',
    summary: '',
    tracking_reason: '',
    position: 'monitor'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'introduced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'committee': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'floor': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'signed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'support': return 'bg-green-100 text-green-800 border-green-200';
      case 'oppose': return 'bg-red-100 text-red-800 border-red-200';
      case 'monitor': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.bill_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bill.author?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || 
                           (bill.client_bills.priority_override || bill.priority) === priorityFilter;
    const matchesPosition = positionFilter === 'all' || bill.client_bills.position === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesPosition;
  });

  const handleTrackBill = () => {
    if (onTrackBill) {
      onTrackBill(newBill);
      setNewBill({
        bill_number: '',
        title: '',
        summary: '',
        tracking_reason: '',
        position: 'monitor'
      });
      setIsTrackDialogOpen(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertCircle className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Label htmlFor="search" className="sr-only">Search bills</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search bills, titles, or authors..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="introduced">Introduced</SelectItem>
              <SelectItem value="committee">Committee</SelectItem>
              <SelectItem value="floor">Floor</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="signed">Signed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="oppose">Oppose</SelectItem>
              <SelectItem value="monitor">Monitor</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isTrackDialogOpen} onOpenChange={setIsTrackDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Track Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Track New Bill</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bill_number">Bill Number</Label>
                  <Input
                    id="bill_number"
                    value={newBill.bill_number}
                    onChange={(e) => setNewBill({ ...newBill, bill_number: e.target.value })}
                    placeholder="e.g., HB 1234"
                  />
                </div>
                <div>
                  <Label htmlFor="bill_title">Bill Title</Label>
                  <Input
                    id="bill_title"
                    value={newBill.title}
                    onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
                    placeholder="Enter bill title"
                  />
                </div>
                <div>
                  <Label htmlFor="tracking_reason">Tracking Reason</Label>
                  <Input
                    id="tracking_reason"
                    value={newBill.tracking_reason}
                    onChange={(e) => setNewBill({ ...newBill, tracking_reason: e.target.value })}
                    placeholder="Why are we tracking this bill?"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select value={newBill.position} onValueChange={(value) => setNewBill({ ...newBill, position: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="oppose">Oppose</SelectItem>
                      <SelectItem value="monitor">Monitor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsTrackDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleTrackBill}>
                    Track Bill
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <Card key={i} className="h-32">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredBills.map((bill) => (
            <Card key={bill.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="outline" className="font-mono">
                        {bill.bill_number}
                      </Badge>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                      <Badge className={getPriorityColor(bill.client_bills.priority_override || bill.priority)}>
                        <span className="mr-1">
                          {getPriorityIcon(bill.client_bills.priority_override || bill.priority)}
                        </span>
                        {bill.client_bills.priority_override || bill.priority}
                      </Badge>
                      <Badge className={getPositionColor(bill.client_bills.position)}>
                        {bill.client_bills.position}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {bill.title}
                    </h3>
                    {bill.summary && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {bill.summary}
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewBill?.(bill.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {bill.author && (
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Author: {bill.author}</span>
                    </div>
                  )}
                  
                  {bill.chamber && (
                    <div className="flex items-center text-muted-foreground">
                      <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{bill.chamber}</span>
                    </div>
                  )}
                  
                  {bill.last_action_date && (
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{new Date(bill.last_action_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {bill.client_bills.tracking_reason && (
                  <>
                    <Separator className="my-3" />
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Tracking Reason: </span>
                      <span className="text-muted-foreground">{bill.client_bills.tracking_reason}</span>
                    </div>
                  </>
                )}

                {bill.last_action && (
                  <>
                    <Separator className="my-3" />
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Last Action: </span>
                      <span className="text-muted-foreground">{bill.last_action}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredBills.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No bills found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || positionFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by tracking your first bill'
              }
            </p>
            {(!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && positionFilter === 'all') && (
              <Button onClick={() => setIsTrackDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Track Your First Bill
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegislationTracking;