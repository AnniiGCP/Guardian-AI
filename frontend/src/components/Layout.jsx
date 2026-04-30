import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import DotField from './DotField';
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Upload', path: '/dashboard/upload', icon: 'upload' },
    { name: 'Location', path: '/dashboard/location', icon: 'location_on' },
    // { name: 'Social Media', path: '/dashboard/social', icon: 'share' },
    { name: 'Session History', path: '/dashboard/history', icon: 'history' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'settings' },
    { name: 'Support', path: '/dashboard/support', icon: 'help_outline' },
  ];

  return (
    <div className="text-foreground font-body-md relative antialiased">
      <DotField className="absolute inset-0 -z-10 pointer-events-none" dotSpacing={14} />
      {/* TopNavBar */}
      <nav className="fixed top-0 right-0 left-0 md:left-64 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl flex justify-between items-center px-6 h-[76px]">
        <div className="flex items-center gap-md">
          {/* <span className="text-xl font-bold tracking-tighter text-foreground">SafeWatch</span> */}
          <div className="hidden md:flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-full border border-border/40">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></div>
            <span className="font-label-sm text-label-sm text-muted-foreground">Monitoring Active</span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex gap-4 items-center relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`transition-all duration-200 p-2 rounded-full relative ${showNotifications ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: showNotifications ? "'FILL' 1" : "'FILL' 0" }}>notifications</span>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
            </button>

            {showNotifications && (
              <div className="absolute top-full mt-3 right-0 w-80 bg-white dark:bg-zinc-950 rounded-2xl p-0 shadow-2xl border border-green-500/30 dark:border-zinc-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Subtle green internal glow (light) / Gray gradient (dark) */}
                <div className="absolute inset-0 bg-green-500/[0.02] dark:bg-zinc-900/40 pointer-events-none -z-10"></div>

                <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-green-500/10 dark:border-zinc-700/30 dark:bg-zinc-800/40">
                  <h4 className="font-headline-sm m-0 text-foreground">Notifications</h4>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-green-600 dark:text-zinc-400 bg-green-500/20 dark:bg-zinc-800/50 px-2 py-0.5 rounded-full">2 New</span>
                </div>

                <div className="max-h-[360px] overflow-y-auto divide-y divide-border/20">
                  <div className="p-4 hover:bg-red-500/5 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-red-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground mb-0.5 group-hover:text-red-600 transition-colors">High Risk Detected</div>
                        <div className="text-muted-foreground text-xs leading-relaxed">System flagged session #8291 for immediate parent review.</div>
                        <div className="text-[10px] text-muted-foreground/60 mt-2">2 minutes ago</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-primary/5 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors">Model Update</div>
                        <div className="text-muted-foreground text-xs leading-relaxed">Language detection patterns updated for "Isolation" stage.</div>
                        <div className="text-[10px] text-muted-foreground/60 mt-2">1 hour ago</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group opacity-60">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-muted-foreground text-[18px]">history</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground mb-0.5">Weekly Report</div>
                        <div className="text-muted-foreground text-xs leading-relaxed">Your summary for the past 7 days is now available.</div>
                        <div className="text-[10px] text-muted-foreground/60 mt-2">Yesterday</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-500/5 dark:bg-zinc-800/20 border-t border-green-500/20 dark:border-zinc-700/30 text-center">
                  <button className="text-[11px] font-bold uppercase tracking-wider text-green-600 dark:text-zinc-400 hover:text-green-700 dark:hover:text-zinc-300 transition-colors">
                    View All Activity
                  </button>
                </div>
              </div>
            )}

            <div className="p-1">
              <AnimatedThemeToggler />
            </div>
          </div>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className={`w-10 h-10 rounded-full bg-secondary overflow-hidden border-2 transition-all duration-300 ${showProfile ? 'border-primary ring-4 ring-primary/10' : 'border-border hover:border-primary/50'} cursor-pointer hover:scale-95`}
            >
              <img alt="User profile avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAh6pDaMp3rioURhHxP7quxPiy4aDaxsDM6x2dCwCmBq7uxTMYvcokO8NMqTp0VgPn28SQ8wJbal-VFFWWK1gBZvkmfguFwagvgvuFjQg2zU2bdZJv-2htisby93puygF5XSad4PAnKy9YwE8V8bsgeMJIxGpmo_YZTNfFtW64j-By4-fTcGHdpTufaPnNQzZxA89-MpX1Quj8FJIkdvLTZ1xsv3gbdKitSiTYQS5CQumpSfQR-fr1LLwIpbXJnFQggRs_2PEoWBJ8" />
            </button>

            {showProfile && (
              <div className="absolute top-full mt-3 right-0 w-[360px] bg-white dark:bg-zinc-950 rounded-3xl p-0 shadow-2xl border border-border/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                {/* Profile Header */}
                <div className="p-6 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-b border-border/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 p-1 border-2 border-primary/20">
                      <img src="/logo.png" className="w-full h-full object-cover rounded-xl" alt="Parent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-headline-md m-0 text-sm">Jonathan Doe</h3>
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[8px] font-bold tracking-widest shadow-lg shadow-primary/20">PRO</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">parent-account@guardianai.io</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white/40 dark:bg-zinc-800/40 p-3 rounded-2xl border border-white/50 dark:border-zinc-700/50">
                    <div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-0.5">Subscription</div>
                      <div className="text-xs font-bold">$12.99 / Month</div>
                    </div>
                    <button className="text-[10px] font-bold text-primary hover:underline">Manage</button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-2">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 m-0">Children Monitored (3)</h4>
                    <button className="text-[10px] font-bold text-primary hover:underline">+ Add</button>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'Emma', status: 'Online', icon: 'face_3', color: 'bg-green-500' },
                      { name: 'Liam', status: 'At School', icon: 'face', color: 'bg-amber-500' },
                    ].map(child => (
                      <button key={child.name} className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">{child.icon}</span>
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-bold">{child.name}</div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${child.color}`}></span>
                              <span className="text-[10px] text-muted-foreground">{child.status}</span>
                            </div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-muted-foreground/40 group-hover:translate-x-1 transition-transform text-[18px]">chevron_right</span>
                      </button>
                    ))}
                  </div>

                  <div className="h-px bg-border/20 my-2 mx-4"></div>

                  <div className="space-y-1">
                    {[
                      { label: 'Family & Co-Parents', icon: 'group', path: '/dashboard/settings?tab=family' },
                      { label: 'Activity Summaries', icon: 'assessment', path: '/dashboard/settings?tab=reports' },
                      { label: 'Security & Sessions', icon: 'lock', path: '/dashboard/settings?tab=account' },
                    ].map(link => (
                      <button
                        key={link.label}
                        onClick={() => { navigate(link.path); setShowProfile(false); }}
                        className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group"
                      >
                        <span className="material-symbols-outlined text-[18px] text-muted-foreground group-hover:text-primary transition-colors">{link.icon}</span>
                        <span className="text-[13px] font-semibold">{link.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-muted/10 border-t border-border/30 flex items-center justify-between">
                  <div className="text-[10px] text-muted-foreground">v2.4.0 (Stable)</div>
                  <button className="flex items-center gap-1.5 text-red-500 font-bold text-[11px] uppercase tracking-wider hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SideNavBar & Main Content Wrapper */}
      <div className="flex min-h-screen">
        {/* SideNavBar (Hidden on Mobile) */}
        <aside className="hidden md:flex flex-col h-screen py-6 gap-2 w-64 fixed left-0 top-0 border-r border-border/30 bg-background/80 backdrop-blur-xl z-50 overflow-hidden">
          <div className="relative z-10 pl-4 pr-6 mb-6 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-14 h-14 bg-muted overflow-hidden border-2 border-border shadow-sm flex items-center justify-center rounded-xl bg-primary/5 hover:scale-105 transition-transform">
                <img alt="Guardian-AI Logo" className="w-full h-full object-cover" src="/logo.png" />
              </div>
              <h2 className="font-headline-md text-headline-md text-foreground hover:text-primary transition-colors">GUARDIAN-AI</h2>
            </Link>
          </div>

          <div className="relative z-10 mx-4 h-px bg-border/30 mb-2"></div>

          <nav className="relative z-10 flex-1 flex flex-col gap-2 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mx-2 hover:translate-x-1 transition-transform duration-200 ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="relative z-10 px-5 py-4 border-t border-border/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[16px]">shield</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-foreground leading-tight">Guardian AI</div>
                <div className="text-[9px] text-muted-foreground">v2.4.0 • Stable</div>
              </div>
            </div>
            <p className="text-[9px] text-muted-foreground/60 leading-relaxed">© 2024 Guardian AI. Keeping children safe online.</p>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 md:ml-64 mt-[76px] p-6 lg:p-lg max-w-[1440px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
