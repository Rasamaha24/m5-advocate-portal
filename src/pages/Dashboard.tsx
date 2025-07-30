import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Bell, 
  Calendar,
  ExternalLink,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Download,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'SB 150 - Committee Hearing Scheduled',
      message: 'Your tracked bill has a hearing scheduled for tomorrow at 2:00 PM',
      time: '2 hours ago',
      client: 'Austin Energy'
    },
    {
      id: 2,
      type: 'update',
      title: 'HB 2347 - Bill Text Updated',
      message: 'Amendment filed affecting Section 3.2 of your tracked legislation',
      time: '4 hours ago',
      client: 'Texas Municipal League'
    },
    {
      id: 3,
      type: 'success',
      title: 'Weekly Report Generated',
      message: 'Your client report for Texas Association of Realtors is ready for review',
      time: '1 day ago',
      client: 'Texas Association of Realtors'
    }
  ]);

  const [clients] = useState([
    {
      id: 1,
      name: 'Austin Energy',
      bills: 12,
      status: 'active',
      lastUpdate: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Texas Municipal League',
      bills: 8,
      status: 'active',
      lastUpdate: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Texas Association of Realtors',
      bills: 15,
      status: 'active',
      lastUpdate: '1 day ago',
      priority: 'high'
    },
    {
      id: 4,
      name: 'Houston Chamber of Commerce',
      bills: 6,
      status: 'review',
      lastUpdate: '2 days ago',
      priority: 'low'
    }
  ]);

  const [recentBills] = useState([
    {
      id: 'SB150',
      title: 'Municipal Utility District Reform Act',
      status: 'committee',
      client: 'Austin Energy',
      priority: 'high',
      nextAction: 'Committee Hearing - Tomorrow 2:00 PM'
    },
    {
      id: 'HB2347',
      title: 'Real Estate Commission Modernization',
      status: 'pending',
      client: 'Texas Association of Realtors',
      priority: 'high',
      nextAction: 'Floor Vote - Next Week'
    },
    {
      id: 'HB1892',
      title: 'Local Government Transparency Requirements',
      status: 'filed',
      client: 'Texas Municipal League',
      priority: 'medium',
      nextAction: 'Committee Assignment Pending'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'committee': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'filed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Welcome Section */}
      <section className="bg-gradient-soft py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back to your Legislative Portal
              </h1>
              <p className="text-muted-foreground mt-2">
                Track legislation, manage clients, and stay ahead of Texas policy changes
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
              <Button className="bg-gradient-primary">
                <Bell className="h-4 w-4 mr-2" />
                Notifications (3)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="legislation">Legislation</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Clients</p>
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +2 this month
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Bills Tracked</p>
                        <p className="text-2xl font-bold text-foreground">41</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <FileText className="h-3 w-3 mr-1" />
                          3 new today
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Urgent Actions</p>
                        <p className="text-2xl font-bold text-foreground">5</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          2 due today
                        </p>
                      </div>
                      <Bell className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Reports Generated</p>
                        <p className="text-2xl font-bold text-foreground">28</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          All delivered
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === 'urgent' ? 'bg-red-500' :
                          notification.type === 'update' ? 'bg-blue-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">{notification.client}</Badge>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Notifications
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Priority Bills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Priority Legislation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentBills.map((bill) => (
                      <div key={bill.id} className="p-3 rounded-lg border border-border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">{bill.id}</Badge>
                              <Badge className={getPriorityColor(bill.priority)}>{bill.priority}</Badge>
                            </div>
                            <p className="text-sm font-medium text-foreground">{bill.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{bill.client}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                            <span className="text-xs text-muted-foreground">{bill.nextAction}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Bills
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Client Management</h2>
                <Button className="bg-gradient-primary">
                  <Users className="h-4 w-4 mr-2" />
                  Add New Client
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <iframe 
                    src="https://carnation-yoke-a1d.notion.site/ebd/23a84e95344c814a83e9dee7260124df" 
                    width="100%" 
                    height="600" 
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legislation Tab */}
            <TabsContent value="legislation" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Legislative Tracking</h2>
                <Button className="bg-gradient-primary">
                  <FileText className="h-4 w-4 mr-2" />
                  Track New Bill
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <iframe 
                    src="https://carnation-yoke-a1d.notion.site/ebd/23e84e95344c81f49567e963358f578c?v=23e84e95344c81a0a61c000c9822e328" 
                    width="100%" 
                    height="600" 
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Client Reports</h2>
                <Button className="bg-gradient-primary">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Weekly Summary</h3>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Ready</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive weekly report for Texas Association of Realtors covering all tracked legislation
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Monthly Analysis</h3>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Generating</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Deep-dive analysis for Austin Energy including impact assessments and recommendations
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <Clock className="h-4 w-4 mr-1" />
                        Processing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Custom Report</h3>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Special legislative session summary for Texas Municipal League emergency session coverage
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Edit Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;