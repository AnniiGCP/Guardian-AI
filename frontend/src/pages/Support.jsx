const Support = () => {
  return (
    <div className="max-w-[1200px] mx-auto space-y-12 pb-12 pt-6">
      
      {/* Hero Section */}
      <div className="relative rounded-[2rem] overflow-hidden glass-card border border-border/50 p-12 text-center shadow-lg">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10 z-0 pointer-events-none"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[672px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            Support Center
          </div>
          
          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">How can we help?</h1>
          <p className="font-body-lg text-muted-foreground mb-10 text-lg">Search for articles, guides, and troubleshooting steps.</p>
          
          {/* Search Bar */}
          <div className="relative group max-w-[576px] mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-card/90 backdrop-blur-md border border-border/50 rounded-full p-2 shadow-lg">
              <span className="material-symbols-outlined text-muted-foreground ml-4">search</span>
              <input 
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-0 font-body-md" 
                placeholder="Search for 'location tracking' or 'privacy'..." 
                type="text" 
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-label-md font-semibold hover:bg-primary/90 transition-colors shadow-md hidden sm:block">
                Search
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Popular:</span>
            <span className="text-sm font-medium bg-muted/80 text-foreground px-4 py-1.5 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors border border-border/50">Device Pairing</span>
            <span className="text-sm font-medium bg-muted/80 text-foreground px-4 py-1.5 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors border border-border/50">Account Setup</span>
            <span className="text-sm font-medium bg-muted/80 text-foreground px-4 py-1.5 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors border border-border/50">Safe Zones</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Browse Categories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-[1.5rem] p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-primary/50 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>rocket_launch</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">Getting Started</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 relative z-10 leading-relaxed">Learn the basics of setting up Guardian-AI, connecting devices, and configuring your first safe zones.</p>
            <div className="flex items-center text-primary text-sm font-semibold relative z-10">
              View articles <span className="material-symbols-outlined text-[18px] ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="glass-card rounded-[1.5rem] p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-blue-500/50 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-blue-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>shield_lock</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">Privacy & Security</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 relative z-10 leading-relaxed">Understand our strict data encryption, family protection policies, and how we handle sensitive information.</p>
            <div className="flex items-center text-blue-500 text-sm font-semibold relative z-10">
              View articles <span className="material-symbols-outlined text-[18px] ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-[1.5rem] p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-amber-500/50 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-amber-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>build</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">Troubleshooting</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 relative z-10 leading-relaxed">Fix offline devices, sync issues, GPS accuracy problems, and other technical hiccups easily.</p>
            <div className="flex items-center text-amber-500 text-sm font-semibold relative z-10">
              View articles <span className="material-symbols-outlined text-[18px] ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="glass-card rounded-[1.5rem] p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-purple-500/50 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-purple-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>credit_card</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">Billing & Plans</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 relative z-10 leading-relaxed">Manage your SafeWatch Pro subscriptions, view past invoices, and securely update payment methods.</p>
            <div className="flex items-center text-purple-500 text-sm font-semibold relative z-10">
              View articles <span className="material-symbols-outlined text-[18px] ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
          
          {/* Card 5 */}
          <div className="glass-card rounded-[1.5rem] p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-emerald-500/50 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-emerald-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>notifications_active</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">Alerts & Rules</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 relative z-10 leading-relaxed">Learn how to configure custom notifications, geofence safe zones, and refine content filtering rules.</p>
            <div className="flex items-center text-emerald-500 text-sm font-semibold relative z-10">
              View articles <span className="material-symbols-outlined text-[18px] ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
          
          {/* Card 6 */}
          <div className="glass-card rounded-[1.5rem] p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 hover:border-pink-500/50 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-pink-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>group</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">Family Management</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 relative z-10 leading-relaxed">Add new family members, manage parent/guardian roles, and set up individual child profiles.</p>
            <div className="flex items-center text-pink-500 text-sm font-semibold relative z-10">
              View articles <span className="material-symbols-outlined text-[18px] ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="relative rounded-[2rem] overflow-hidden bg-card/40 border border-border/50 p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-3">Still need help?</h2>
          <p className="text-muted-foreground max-w-[576px] mx-auto md:mx-0 text-base">Our dedicated support team is available 24/7 to assist you with any questions or technical issues you might be facing.</p>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button className="bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            Live Chat
          </button>
          <button className="bg-card border border-border text-foreground px-6 py-3.5 rounded-xl font-semibold hover:bg-muted transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">mail</span>
            Email Us
          </button>
        </div>
      </div>

    </div>
  );
};

export default Support;
