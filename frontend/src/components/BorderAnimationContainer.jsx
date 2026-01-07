// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(45deg,theme(colors.background),theme(colors.card)_50%,theme(colors.background))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.border)_80%,_theme(colors.primary.DEFAULT)_86%,_theme(colors.primary.foreground)_90%,_theme(colors.primary.DEFAULT)_94%,_theme(colors.border))_border-box] rounded-2xl border border-transparent animate-border  flex overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
