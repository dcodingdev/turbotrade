import { Package, DollarSign, Users, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Products', value: '12', icon: Package, change: '+2 this month', changeType: 'positive' },
  { name: 'Total Revenue', value: '$1,284.00', icon: DollarSign, change: '+12.5% from last week', changeType: 'positive' },
  { name: 'Active Customers', value: '84', icon: Users, change: '+3% from last week', changeType: 'positive' },
  { name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '-0.5% from yesterday', changeType: 'negative' },
];

export default function VendorDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className={stat.changeType === 'positive' ? "text-xs font-medium text-green-600" : "text-xs font-medium text-red-600"}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm min-h-[300px] flex items-center justify-center text-muted-foreground italic">
          Revenue Chart Placeholder (Chart.js / Recharts coming soon)
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm min-h-[300px] flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/50 text-sm border-l-4 border-primary">
              <p className="font-medium">New order received!</p>
              <p className="text-xs text-muted-foreground mt-1">Order #8294 by Alice Smith (2 items)</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-sm border-l-4 border-primary">
              <p className="font-medium">Stock alert</p>
              <p className="text-xs text-muted-foreground mt-1">Product "Handmade Ceramic Mug" is low on stock (2 left).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
