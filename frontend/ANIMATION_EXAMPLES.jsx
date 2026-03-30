/**
 * 🎨 ANIMATION USAGE EXAMPLES
 * 
 * This file shows practical examples of how to use the new animations
 * Copy and paste these patterns into your React components!
 */

// ═══════════════════════════════════════════════════════════════════

// Example 1: Beautiful Service Card with All Animations
function ServiceCard({ service }) {
  return (
    <div className="card card-animated hover-lift">
      {/* Card lifts on hover and has smooth entrance animation */}
      <img 
        src={service.image} 
        alt={service.name}
        className="w-full h-40 object-cover"
      />
      
      <div className="card-body">
        <h3 className="text-animated section-title">
          {service.name}
        </h3>
        
        <p className="text-muted animate-fade-in-up-slow">
          {service.description}
        </p>
        
        <div className="flex gap-2 mt-4">
          <span className="badge badge-primary animate-scale-in">
            {service.category}
          </span>
          <span className="badge badge-success animate-scale-in delay-100">
            ⭐ {service.rating}
          </span>
        </div>
        
        <button className="btn btn-primary btn-full mt-6 hover-glow">
          View Details
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 2: Animated Form with All Inputs Enhanced
function LoginForm() {
  return (
    <form className="form-animated space-y-4">
      {/* All inputs will fade in sequentially */}
      
      <div className="input-group animate-fade-in-up">
        <input
          type="email"
          className="input focus-ring"
          placeholder="your@email.com"
        />
      </div>
      
      <div className="input-group animate-fade-in-up delay-100">
        <input
          type="password"
          className="input focus-ring"
          placeholder="••••••••"
        />
      </div>
      
      <button 
        className="btn btn-primary btn-full btn-lg animate-scale-in delay-200 hover-glow"
      >
        Login
      </button>
      
      <p className="text-center text-muted animate-fade-in delay-300">
        Don't have an account?{' '}
        <a href="/register" className="text-primary hover:animation-scale">
          Register here
        </a>
      </p>
    </form>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 3: Service Grid with Staggered Animations
function ServicesGrid({ services }) {
  return (
    <div className="container py-6">
      <h2 className="section-title text-animated">
        Available Services
      </h2>
      
      <p className="section-sub animate-fade-in-up-slow">
        Browse our amazing collection of services
      </p>
      
      {/* grid-stagger automatically staggers child animations */}
      <div className="grid grid-3 grid-stagger mt-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 4: Alert with Smooth Animation
function SuccessAlert({ message }) {
  return (
    <div className="alert alert-success animate-slide-in-left">
      <span>✓</span>
      <p>{message}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 5: Loading Skeleton
function ServiceCardSkeleton() {
  return (
    <div className="card">
      <div className="skeleton-animated" style={{ height: '160px' }} />
      
      <div className="card-body">
        <div className="skeleton-animated mb-4" style={{ height: '20px' }} />
        <div className="skeleton-animated mb-4" style={{ height: '20px', width: '80%' }} />
        <div className="skeleton-animated" style={{ height: '40px' }} />
      </div>
    </div>
  )
}

// Loading multiple skeletons
function ServicesLoading() {
  return (
    <div className="grid grid-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 6: Button with All Hover Effects
function ActionButtons() {
  return (
    <div className="flex gap-4 flex-wrap">
      {/* Primary with glow */}
      <button className="btn btn-primary hover-glow">
        Primary Action
      </button>
      
      {/* Outline with scale */}
      <button className="btn btn-outline hover-scale">
        Secondary Action
      </button>
      
      {/* Success with brightness */}
      <button className="btn btn-success hover-brightness">
        Success Action
      </button>
      
      {/* Danger with shadow */}
      <button className="btn btn-danger hover-shadow">
        Delete Action
      </button>
      
      {/* Ghost with lift */}
      <button className="btn btn-ghost hover-lift">
        Ghost Action
      </button>
      
      {/* Icon button with rotate */}
      <button className="btn btn-icon hover-rotate">
        ⚙️
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 7: List with Staggered Animations
function MessagesList({ messages }) {
  return (
    <ul className="space-y-3 list-animated">
      {messages.map((msg, i) => (
        <li 
          key={i}
          className="card p-4 hover-lift border-l-4 border-primary"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-animated">{msg.sender}</p>
              <p className="text-muted text-sm">{msg.message}</p>
            </div>
            <span className="text-xs text-muted">{msg.time}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 8: Modal/Dialog with Scale Animation
function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center modal-backdrop-animated">
      <div className="bg-white rounded-lg p-6 max-w-md modal-animated shadow-xl">
        <h3 className="text-animated text-xl font-bold mb-2">
          {title}
        </h3>
        
        <p className="text-muted mb-6 animate-fade-in">
          {message}
        </p>
        
        <div className="flex gap-3 animate-fade-in-up delay-100">
          <button 
            onClick={onCancel}
            className="btn btn-outline flex-1"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="btn btn-danger flex-1 hover-glow"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 9: Badge Group with Entrance Animation
function SkillBadges({ skills }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span 
          key={i}
          className="badge badge-primary animate-scale-in"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          {skill}
        </span>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 10: Dashboard Stats Card with Float Animation
function StatCard({ icon, label, value }) {
  return (
    <div className="card card-animated hover-lift">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="text-4xl icon-animated">
            {icon}
          </div>
          
          <div>
            <p className="text-muted text-sm animate-fade-in">
              {label}
            </p>
            <p className="text-2xl font-bold text-gradient animate-fade-in-up">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardStats({ stats }) {
  return (
    <div className="grid grid-4 grid-stagger">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 11: Loading Spinner with Text
function LoadingState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="loading-spinner">
        <div className="spinner spinner-lg spinner-primary"></div>
      </div>
      <p className="text-muted animate-pulse">
        {message || 'Loading...'}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════

// Example 12: Animated Text with Gradient
function HeroTitle() {
  return (
    <h1 className="section-title text-gradient animate-fade-in-up">
      Welcome to FreelanceHub
    </h1>
  )
}

function HeroSubtitle() {
  return (
    <p className="section-sub animate-fade-in-up-slow">
      Connect with talented freelancers and amazing clients
    </p>
  )
}

// ═══════════════════════════════════════════════════════════════════

// EXPORT ALL EXAMPLES
export {
  ServiceCard,
  LoginForm,
  ServicesGrid,
  SuccessAlert,
  ServiceCardSkeleton,
  ServicesLoading,
  ActionButtons,
  MessagesList,
  ConfirmDialog,
  SkillBadges,
  StatCard,
  DashboardStats,
  LoadingState,
  HeroTitle,
  HeroSubtitle,
}

// ═══════════════════════════════════════════════════════════════════

/*
QUICK ANIMATION REFERENCE

Entrance Animations:
- animate-fade-in
- animate-fade-in-up
- animate-fade-in-up-slow
- animate-slide-in-left
- animate-slide-in-right
- animate-scale-in

Hover Effects:
- hover-lift        (translateY -4px)
- hover-glow        (glowing shadow)
- hover-scale       (scale 1.05)
- hover-scale-sm    (scale 1.02)
- hover-scale-lg    (scale 1.1)
- hover-rotate      (rotate 5deg)
- hover-brightness  (brighten 1.1)
- hover-shadow      (shadow-xl)

Motion Effects:
- animate-pulse     (opacity pulse)
- animate-bounce    (bouncing)
- animate-float     (floating)
- animate-spin      (spinning)
- animate-glow      (glowing)

Delay Classes:
- delay-100, delay-200, delay-300, delay-400, delay-500

Grid Effects:
- grid-stagger      (auto-stagger children)

Transition Classes:
- transition-all    (all properties)
- transition-colors (colors only)
- transition-transform (transform only)
- transition-opacity (opacity only)
- transition-shadow (shadow only)

Component-Specific:
- card-animated     (card with animations)
- modal-animated    (modal entry animation)
- list-animated     (list with stagger)
- form-animated     (form with animations)
- badge-animated    (badge animations)
- skeleton-animated (loading skeleton)

Text Animations:
- text-animated     (fade in)
- text-gradient     (gradient color)
- text-glow         (glowing text)
*/