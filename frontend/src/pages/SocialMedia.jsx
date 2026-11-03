

const SocialMedia = () => {
  return (
    <>
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h2 className="font-display-sm text-display-sm text-foreground">Social Media Intelligence</h2>
          <p className="font-body-md text-body-md text-muted-foreground mt-1">AI-driven analysis of connected digital platforms.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-label-sm border border-primary/20 shadow-sm shadow-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary pulse-dot"></span>
            Syncing Active
          </span>
          <span className="font-label-sm text-label-sm text-muted-foreground opacity-60 italic">Last scan: Just now</span>
        </div>
      </header>

      {/* Platform Overview Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Instagram Card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-orange-400/20 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-pink-500">photo_camera</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-foreground">Instagram</h3>
                <p className="font-label-sm text-label-sm text-muted-foreground">@emma_watches</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-label-sm text-label-sm flex items-center gap-1.5 border border-green-500/20 shadow-sm shadow-green-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live
            </span>
          </div>
          <div className="mt-auto space-y-4 relative z-10">
            <div className="flex justify-between items-baseline border-b border-border/50 pb-2">
              <span className="text-sm text-muted-foreground">Messages Scanned</span>
              <span className="font-headline-md text-headline-md text-foreground">1,240</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border/50 pb-2">
              <span className="text-sm text-muted-foreground">New Followers</span>
              <span className="font-headline-md text-headline-md text-foreground">12</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-label-md text-label-md text-foreground">Risk Level</span>
              <span className="px-2 py-0.5 rounded text-green-700 dark:text-green-400 bg-green-500/10 font-label-sm text-label-sm">Low</span>
            </div>
          </div>
        </div>

        {/* TikTok Card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-red-400/20 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-cyan-600">music_video</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-foreground">TikTok</h3>
                <p className="font-label-sm text-label-sm text-muted-foreground">@emz_dance</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-label-sm text-label-sm flex items-center gap-1.5 border border-green-500/20 shadow-sm shadow-green-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live
            </span>
          </div>
          <div className="mt-auto space-y-4 relative z-10">
            <div className="flex justify-between items-baseline border-b border-border/50 pb-2">
              <span className="text-sm text-muted-foreground">Videos Watched</span>
              <span className="font-headline-md text-headline-md text-foreground">342</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border/50 pb-2">
              <span className="text-sm text-muted-foreground">Comments Scanned</span>
              <span className="font-headline-md text-headline-md text-foreground">89</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-label-md text-label-md text-foreground">Risk Level</span>
              <span className="px-2 py-0.5 rounded text-green-700 dark:text-green-400 bg-green-500/10 font-label-sm text-label-sm">Low</span>
            </div>
          </div>
        </div>

        {/* Discord Card (Alert State) */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden border-red-500/30 bg-red-500/[0.03] group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-foreground">Discord</h3>
                <p className="font-label-sm text-label-sm text-muted-foreground">Emma#4921</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-label-sm text-label-sm flex items-center gap-1.5 border border-red-500/20 shadow-sm shadow-red-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Alert
            </span>
          </div>
          <div className="mt-auto space-y-4 relative z-10">
            <div className="flex justify-between items-baseline border-b border-border/50 pb-2">
              <span className="text-sm text-muted-foreground">Servers Active</span>
              <span className="font-headline-md text-headline-md text-foreground">4</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border/50 pb-2">
              <span className="text-sm text-muted-foreground">Direct Messages</span>
              <span className="font-headline-md text-headline-md text-foreground">56</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-label-md text-label-md text-foreground">Risk Level</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="px-2 py-0.5 rounded text-red-700 dark:text-red-400 bg-red-500/20 font-label-sm text-label-sm font-bold">Elevated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Flagged Interactions (Spans 8 cols) */}
        <div className="lg:col-span-8 glass-card rounded-xl p-6 ambient-shadow">
          <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
            <h3 className="font-headline-lg text-headline-lg text-foreground">Recent Flagged Interactions</h3>
            <button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {/* Alert Item 1 */}
            <div className="p-4 rounded-lg bg-muted/20 border border-red-500/30 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-headline-md text-headline-md text-foreground text-base">Inappropriate Content Detected</h4>
                    <span className="font-label-sm text-label-sm text-muted-foreground">10 mins ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Direct Message via Discord from Unknown User "GamerX99"</p>
                  <div className="p-3 bg-muted/50 rounded border border-border/50 text-sm italic text-muted-foreground mb-3">
                    "Message content blurred for safety. Contains explicit language."
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-primary text-primary-foreground font-label-sm text-label-sm rounded hover:bg-primary/90 transition-colors">Review Context</button>
                    <button className="px-3 py-1.5 bg-secondary text-secondary-foreground font-label-sm text-label-sm rounded hover:bg-secondary/80 transition-colors border border-border/50">Block User</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Item 2 */}
            <div className="p-4 rounded-lg bg-muted/20 border border-border/50 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-blue-500">person_add</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-headline-md text-headline-md text-foreground text-base">New Connection out of Age Range</h4>
                    <span className="font-label-sm text-label-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">New follower on Instagram appears to be significantly older.</p>
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded border border-border/50 mb-3 w-max">
                    <img alt="Profile pic" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADBDPrXoO7ZlzE6SqBdV9b2skp327i4P4E4AIfi5ba5R9aXmArFFvup3WFVOhO1UL8T8L0i4zzW8hlu1BYO-RD2AgtMmh-QbuflIft1AO7LtXRor-vgPxfsYvn1beLIrd2gSNjUYlB2t_9C13bkp7axzjwJ-yWJAcX7tGCQjHkDLq6ZjsPURNuqY1o9E0OfrN6SZ8tD2QsVwGyv04gy5FBBUC5n1wD8MIb4dFYLGAAKCV_MRxPuQLuNDGHeurZWFDePo_-8nBzDdSF" />
                    <span className="font-label-sm text-label-sm text-foreground">@john_smith78</span>
                  </div>
                  <button className="text-primary font-label-sm text-label-sm hover:underline">View Profile Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Analysis Summary (Spans 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-xl p-6 ambient-shadow">
            <h3 className="font-headline-lg text-headline-lg text-foreground mb-4">Risk Category Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-foreground">Cyberbullying</span>
                  <span className="text-green-500">Low (2%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-foreground">Explicit Content</span>
                  <span className="text-red-500 font-bold">Elevated (15%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-foreground">Predatory Behavior</span>
                  <span className="text-green-500">Low (0%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 ambient-shadow bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">insights</span>
              <div>
                <h4 className="font-headline-md text-headline-md text-foreground mb-1">AI Insight</h4>
                <p className="text-sm text-muted-foreground">Overall social media activity is typical for age group, but Discord usage shows a recent spike in unverified contacts. Recommend reviewing privacy settings on that platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialMedia;
