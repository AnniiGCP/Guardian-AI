

const Location = () => {
  return (
    <div className="relative w-full h-[calc(100vh-120px)] rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-1000">
      {/* Interactive Map Placeholder */}
      <div className="absolute inset-0 z-0 bg-secondary">
        <img className="w-full h-full object-cover opacity-90" data-alt="High altitude clean aerial map view of a modern city grid and suburbs with subtle premium color grading and soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP5C4ZzDymNlCP9kPMleMorm8r2b_iBhmxO3v4wHQZ8YpsY6tCyBEEfW5Tsa-T9rk5ODACqJayfNNYKfjcwFr7Cn3nG1QBzweley4GL3vWXrkLEQxWRpi_uVQfz-nJyXhQLKX-mNLmf85Swrgcl7xLVy4KDekVsTOpezhMfWhmMpoKIzMmPiFQGNpQBhEkjR9EGDCFfPfn7SLiwQP-9e38FyqM5D6l4lthSPprBcm-j2IJCtIfzZcURqktFXXP0mS2E69FlG3rT3Pc" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/20 pointer-events-none"></div>

        {/* Simulated User Map Marker */}
        <div className="absolute top-[45%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
          <div className="bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1.5 rounded-full shadow-lg mb-2 backdrop-blur-md bg-opacity-90 border border-white/20">
            Emma is here
          </div>
          <div className="relative w-14 h-14">
            {/* Static representation of pulsing alert for 'Live' focus */}
            <div className="absolute inset-0 rounded-full bg-primary opacity-20 scale-150"></div>
            <div className="absolute inset-0 rounded-full bg-primary opacity-40 scale-110"></div>
            <div className="relative w-full h-full bg-white rounded-full p-1 shadow-xl border-2 border-primary">
              <img className="w-full h-full rounded-full object-cover" data-alt="Portrait of a young teenage girl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYfO0rXac708GrAtiWhCQVnscoTO03qH-slDq1bqeq89emT45_EQRbosilbCvloXVWsnD5BVkm87a7HLwhbWUMpZvIMD74VKDrdegwZaahyDDG6F7Vv21DRt2iGDv0Q_QiJquoHvSfORRo2FVTH0mz9t2y8XTCqJeg-Hu6IAl5U-OfnMYDI9dFWE0-5Q1NsqLC7xIejh4MuRN_jxF7FjyE82d1NRQrzszk62uIh8JS1RFvGDMHLqmY-5zFwvsVJHjseJEU8HXVZfmO" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating UI Layer */}
      <div className="relative z-20 h-full p-6 lg:p-lg flex flex-col justify-between pointer-events-none max-w-container-max mx-auto">
        {/* Top Section: Status & Controls */}
        <div className="flex justify-between items-start w-full">
          {/* Real-time Status Card */}
          <div className="glass-card rounded-2xl p-6 w-[360px] pointer-events-auto animate-in fade-in slide-in-from-left-6 duration-700 delay-200 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/50 shadow-md">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPqTORWV3_KFUZhLFaUFP3O5A_pNAaDgBg97HrWBERvSGA-CdVct_K_KKUMo3dWA8w0BYDombeviyJCjVwvIBTGZPQbHrJcowqWW_GJyj718XAKZ0xE-em3JxPofjlqmFamk49R_9761sbxXs9D9ofAGP1sOHJvF5S2QsvAzg45oiXyG62jXYPs6RfacvX8xebV_XeqZNWJ68d_so4L45iL96zYOGIVkG2dj4JwHB-soAlpw8dmOFDT57w2C6rqvQoCFMYT0Tu1fXc" alt="Emma" />
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-foreground">Emma</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 block relative">
                      <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></span>
                    </span>
                    <span className="font-label-sm text-label-sm text-red-600 dark:text-red-400 font-bold tracking-tight">LIVE TRACKING</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="material-symbols-outlined text-muted-foreground" style={{ fontVariationSettings: "'FILL' 1" }}>battery_5_bar</span>
                <span className="font-label-sm text-label-sm text-muted-foreground mt-1">82%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-muted-foreground">Current Location</p>
                  <p className="font-body-md text-body-md text-foreground font-medium">1420 Washington Blvd</p>
                  <p className="font-label-sm text-label-sm text-muted-foreground mt-0.5">Updated just now</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">directions_walk</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-muted-foreground">Movement</p>
                  <p className="font-body-md text-body-md text-foreground font-medium">Walking • 3 mph</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Tools */}
          <div className="glass-card rounded-full p-2 flex flex-col gap-2 pointer-events-auto">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="h-px bg-border/50 w-6 mx-auto"></div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <div className="h-px bg-border/50 w-6 mx-auto"></div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">layers</span>
            </button>
          </div>
        </div>

        {/* Bottom Section: Safe Zones & History */}
        <div className="flex gap-6 w-full items-end justify-start pb-4 overflow-x-auto">
          {/* Safe Zones Panel */}
          <div className="glass-card rounded-[1.5rem] p-6 min-w-[380px] pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400 hover:shadow-2xl transition-all border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-foreground flex items-center gap-2 m-0">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                Safe Zones
              </h3>
              <button className="text-primary font-label-md text-label-md hover:underline bg-primary/5 px-3 py-1 rounded-lg transition-colors">Edit</button>
            </div>

            <div className="space-y-3">
              <div className="bg-muted/30 rounded-lg p-3 border border-border/50 flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-foreground font-semibold">Home</p>
                    <p className="font-label-sm text-label-sm text-muted-foreground">Radius: 200m</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-label-sm text-label-sm">
                  Away
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 border border-border/50 flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-foreground font-semibold">Lincoln High</p>
                    <p className="font-label-sm text-label-sm text-muted-foreground">Radius: 500m</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Inside
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 border border-border/50 rounded-lg font-label-md text-label-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Create New Zone
            </button>
          </div>

          {/* Recent Activity Panel */}
          <div className="glass-card rounded-[1.5rem] p-6 min-w-[340px] pointer-events-auto relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 hover:shadow-2xl transition-all border border-border/50">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-foreground mb-6 flex items-center gap-2 m-0">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                Today's Path
              </h3>

              <div className="relative border-l-2 border-secondary ml-4 space-y-6">
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-secondary border-2 border-primary rounded-full -left-[7.5px] top-1"></div>
                  <p className="font-label-sm text-label-sm text-muted-foreground mb-0.5">3:15 PM</p>
                  <p className="font-body-md text-body-md text-foreground font-medium">Left Lincoln High</p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-secondary border-2 border-border rounded-full -left-[7.5px] top-1"></div>
                  <p className="font-label-sm text-label-sm text-muted-foreground mb-0.5">1:00 PM</p>
                  <p className="font-body-md text-body-md text-foreground font-medium">Arrived at Campus Cafe</p>
                  <p className="font-label-sm text-label-sm text-muted-foreground mt-1">Stayed for 45 mins</p>
                </div>

                <div className="relative pl-6 pb-2">
                  <div className="absolute w-3 h-3 bg-secondary border-2 border-border rounded-full -left-[7.5px] top-1"></div>
                  <p className="font-label-sm text-label-sm text-muted-foreground mb-0.5">8:10 AM</p>
                  <p className="font-body-md text-body-md text-foreground font-medium">Arrived at Lincoln High</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
