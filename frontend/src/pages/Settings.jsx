import { useState } from 'react'

const Settings = () => {
  const [activeSection, setActiveSection] = useState('alerts')

  const sections = [
    { id: 'alerts', label: 'Alerts', icon: 'notifications' },
    { id: 'safety', label: 'Safety', icon: 'security' },
    { id: 'reports', label: 'Reports', icon: 'assessment' },
  ]

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="font-display-sm text-display-sm text-foreground mb-2">Settings & Rules</h1>
        <p className="font-body-lg text-body-lg text-muted-foreground">Configure your monitoring rules and safety alerts.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Settings Navigation */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="glass-card rounded-3xl p-3 space-y-1 sticky top-24">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  activeSection === s.id 
                    ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                <span className="font-label-lg font-bold uppercase tracking-wider text-xs">{s.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-8 min-w-0">
          {activeSection === 'alerts' && <AlertsSection />}
          {activeSection === 'safety' && <SafetySection />}
          {activeSection === 'reports' && <ReportsSection />}
        </div>
      </div>
    </div>
  )
}

const AlertsSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
    {/* Alert Thresholds */}
    <div className="glass-card rounded-3xl p-8">
      <h3 className="font-headline-md mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">speed</span>
        </div>
        Alert Thresholds
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-label-md text-muted-foreground">Daily Screen Time Limit</label>
            <span className="font-display-sm text-primary">4.5 hrs</span>
          </div>
          <input type="range" min="1" max="12" defaultValue="4.5" className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary" />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-label-md text-muted-foreground">Min Battery Alert %</label>
            <span className="font-display-sm text-amber-500">15%</span>
          </div>
          <input type="range" min="5" max="50" defaultValue="15" className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-amber-500" />
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-muted-foreground">Safe Zone Radius Size</label>
          <div className="grid grid-cols-3 gap-2">
            {['50m', '150m', '500m'].map(r => (
              <button key={r} className={`py-2.5 rounded-xl border font-label-sm transition-all ${r === '150m' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Notification Preferences */}
    <div className="glass-card rounded-3xl p-8">
      <h3 className="font-headline-md mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">mail</span>
        </div>
        Notification Preferences
      </h3>
      <div className="space-y-4">
        {[
          { label: 'Push Notifications', desc: 'Real-time alerts on your primary device', channels: ['push'], active: true },
          { label: 'SMS Alerts', desc: 'Critical alerts sent via text message', channels: ['sms'], active: true },
          { label: 'Email Reports', desc: 'Weekly summaries and non-critical activity', channels: ['email'], active: false },
        ].map((pref, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-muted/[0.03] border border-border/50 group hover:border-primary/20 transition-all">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-muted-foreground">{pref.channels[0] === 'push' ? 'smartphone' : pref.channels[0] === 'sms' ? 'chat' : 'mail'}</span>
              </div>
              <div>
                <div className="font-label-lg text-foreground">{pref.label}</div>
                <div className="text-sm text-muted-foreground">{pref.desc}</div>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${pref.active ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${pref.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-border/30">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-label-lg m-0 flex items-center gap-2 uppercase tracking-widest text-muted-foreground text-[11px] font-bold">
            <span className="material-symbols-outlined text-[18px]">bedtime</span>
            Quiet Hours
          </h4>
          <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full font-bold">DND ENABLED</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Start Time</label>
            <input type="time" defaultValue="23:00" className="w-full bg-muted/30 border border-border/50 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">End Time</label>
            <input type="time" defaultValue="07:00" className="w-full bg-muted/30 border border-border/50 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">info</span>
          All notifications will be silenced during this period, except for critical emergency triggers.
        </p>
      </div>
    </div>
  </div>
)

const ReportsSection = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
    {/* Activity Summary */}
    <div className="glass-card rounded-3xl p-8">
      <h3 className="font-headline-md mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">analytics</span>
        </div>
        Weekly Activity Digest
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Top Apps Used</div>
          {[
            { name: 'TikTok', time: '12h 40m', color: 'bg-pink-500' },
            { name: 'Roblox', time: '8h 15m', color: 'bg-cyan-500' },
            { name: 'YouTube', time: '5h 30m', color: 'bg-red-500' },
          ].map((app, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{app.name}</span>
                <span className="text-muted-foreground">{app.time}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${app.color}`} style={{ width: i === 0 ? '85%' : i === 1 ? '60%' : '40%' }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Locations Visited</div>
          <div className="space-y-4">
            {[
              { name: 'Lincoln High', visits: 5, icon: 'school' },
              { name: 'Friend\'s House', visits: 3, icon: 'group' },
              { name: 'Central Park', visits: 2, icon: 'park' },
            ].map((loc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">{loc.icon}</span>
                  <span className="text-sm font-medium">{loc.name}</span>
                </div>
                <span className="text-[10px] bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-md font-bold shadow-sm">{loc.visits}x</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center p-6 bg-primary/[0.03] rounded-3xl border border-primary/10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <span className="material-symbols-outlined text-[32px]">timer</span>
          </div>
          <div className="font-display-sm text-2xl text-foreground mb-1">26h 45m</div>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Total Screen Time</p>
          <div className="mt-4 text-[10px] text-green-500 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
            12% lower than last week
          </div>
        </div>
      </div>
    </div>

    {/* Report Downloads */}
    <div className="glass-card rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-headline-md m-0 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">download</span>
          </div>
          Export Activity Reports
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </div>
            <div>
              <div className="font-label-lg">Weekly Summary PDF</div>
              <div className="text-xs text-muted-foreground">Apr 24 - Apr 30, 2024</div>
            </div>
          </div>
          <button className="p-3 bg-muted/50 rounded-xl hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
        <div className="p-6 rounded-2xl border border-border/50 hover:border-emerald-500/30 transition-all flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <span className="material-symbols-outlined">csv</span>
            </div>
            <div>
              <div className="font-label-lg">Detailed Activity CSV</div>
              <div className="text-xs text-muted-foreground">Last 30 Days Activity Log</div>
            </div>
          </div>
          <button className="p-3 bg-muted/50 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>
    </div>
  </div>
)

const SafetySection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    {/* Safe Zone Manager */}
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md flex items-center gap-2 m-0">
          <span className="material-symbols-outlined text-primary">location_on</span>
          Safe Zone Manager
        </h3>
        <button className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">add</span> Add Zone
        </button>
      </div>
      <div className="space-y-3">
        {[
          { name: 'Home', addr: '123 Main St, Springfield', radius: '100m', icon: 'home' },
          { name: 'Springfield Elementary', addr: '456 Education Ave', radius: '200m', icon: 'school' },
          { name: "Friend's House", addr: '789 Play St', radius: '150m', icon: 'group' },
        ].map((zone, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">{zone.icon}</span>
              </div>
              <div>
                <div className="font-label-md text-foreground">{zone.name}</div>
                <div className="text-xs text-muted-foreground">{zone.addr} • {zone.radius} radius</div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><span className="material-symbols-outlined text-[20px]">edit</span></button>
              <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"><span className="material-symbols-outlined text-[20px]">delete</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Emergency Contacts */}
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md flex items-center gap-2 m-0">
          <span className="material-symbols-outlined text-primary">contact_phone</span>
          Emergency Contacts
        </h3>
        <button className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">person_add</span> Add Contact
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Sarah Wilson', relation: 'Spouse', phone: '+1 555-0123', alerts: true },
          { name: 'John Doe', relation: 'Grandparent', phone: '+1 555-4567', alerts: false },
        ].map((contact, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="font-label-md">{contact.name}</div>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">{contact.relation}</span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[16px]">call</span> {contact.phone}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <span className="text-xs text-muted-foreground">Receives Alerts</span>
              <div className={`w-10 h-5 rounded-full p-1 cursor-pointer ${contact.alerts ? 'bg-green-500' : 'bg-muted-foreground/30'}`}>
                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${contact.alerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Settings
