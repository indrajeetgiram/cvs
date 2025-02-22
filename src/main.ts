import { Component, HostListener, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  demoUrl: string;
  technologies: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cursor" #cursor></div>
    <nav class="top-nav">
      <div class="container">
        <div class="nav-links">
          <a class="nav-link" (click)="scrollToSection('angular')">Angular Projects</a>
          <a class="nav-link" (click)="scrollToSection('react')">React Projects</a>
          <a class="nav-link" (click)="scrollToSection('javascript')">JS Projects</a>
          <a class="nav-link" href="/blog">Blog</a>
        </div>
      </div>
    </nav>

    <div class="scroll-to-top" [class.visible]="isScrollButtonVisible" (click)="scrollToTop()">
      <i class="fas fa-arrow-up"></i>
    </div>

    <header class="section" style="background: #f8f9fa;">
      <div class="container">
        <div class="header-content">
          <div class="header-text">
            <h1 style="font-size: 3rem; margin-bottom: 20px;">Portfolio</h1>
            <p style="font-size: 1.2rem; color: #666;">Full Stack Angular Developer</p>
            <div class="header-social-links">
              <a href="https://twitter.com/indrajeet" target="_blank" class="header-social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com/in/indrajeet" target="_blank" class="header-social-link">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://wa.me/yournumber" target="_blank" class="header-social-link">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div class="profile-image-container">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGef1-W4UlKGg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726937130965?e=1745452800&v=beta&t=Bvs8ZBy5LBkX49VYwPJlU1p3uz_a5t7cQkKNIH_r5QI" 
                 alt="Professional headshot" 
                 class="profile-image">
          </div>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list" #skillsList>
          <span class="skill-item" *ngFor="let skill of skills">{{ skill }}</span>
        </div>
      </div>
    </section>

    <section id="angular" class="section angular-section">
      <div class="container">
        <h2 class="section-title">Angular Projects</h2>
        <div class="project-grid">
          <div class="project-card" *ngFor="let project of angularProjects">
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div style="margin-bottom: 15px;">
                <span class="skill-item" *ngFor="let tech of project.technologies" style="margin-right: 8px;">
                  {{ tech }}
                </span>
              </div>
              <a [href]="project.demoUrl" target="_blank" class="project-link">Live Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="react" class="section react-section">
      <div class="container">
        <h2 class="section-title">React Projects</h2>
        <div class="project-grid">
          <div class="project-card" *ngFor="let project of reactProjects">
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div style="margin-bottom: 15px;">
                <span class="skill-item" *ngFor="let tech of project.technologies" style="margin-right: 8px;">
                  {{ tech }}
                </span>
              </div>
              <a [href]="project.demoUrl" target="_blank" class="project-link">Live Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="javascript" class="section javascript-section">
      <div class="container">
        <h2 class="section-title">JavaScript Projects</h2>
        <div class="project-grid">
          <div class="project-card" *ngFor="let project of jsProjects">
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div style="margin-bottom: 15px;">
                <span class="skill-item" *ngFor="let tech of project.technologies" style="margin-right: 8px;">
                  {{ tech }}
                </span>
              </div>
              <a [href]="project.demoUrl" target="_blank" class="project-link">Live Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: #fff;">
  <div class="container">
    <h2 class="section-title">Contact Me</h2>
    <div class="contact-container">
      <div class="contact-social">
        <h3>Connect With Me</h3>
        <div class="contact-social-links">
          <a href="https://twitter.com/indrajeet" target="_blank" class="contact-social-link">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com/in/indrajeet" target="_blank" class="contact-social-link">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://wa.me/yournumber" target="_blank" class="contact-social-link">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <div class="contact-form">
      <p class="contact-email-text" style="font-size: 1.1rem; color: #555; margin-bottom: 1rem;">
   <strong>Prefer email...?</strong> 
   <br>Reach out directly here 📩
</p>

        <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              [(ngModel)]="contactData.name" 
              required 
              class="form-control"
              placeholder="Your name"
            >
          </div>
          
          <div class="form-group">
            <label for="company">Company</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              [(ngModel)]="contactData.company" 
              required 
              class="form-control"
              placeholder="Your company"
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="contactData.email" 
              required 
              class="form-control"
              placeholder="your@email.com"
            >
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              [(ngModel)]="contactData.message" 
              required 
              class="form-control"
              rows="5"
              placeholder="Your message"
            ></textarea>
          </div>

          <button 
            type="submit" 
            [disabled]="!contactForm.form.valid"
            class="submit-button"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p class="footer-text">
            Made with <span class="heart">♥</span> by Indrajeet © {{ currentYear }} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class App implements AfterViewInit {
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('skillsList') skillsList!: ElementRef;

  currentYear = new Date().getFullYear();
  isScrollButtonVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrollButtonVisible = window.scrollY > 300;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.cursor?.nativeElement) {
      gsap.to(this.cursor.nativeElement, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngAfterViewInit() {
    // Initialize cursor position
    if (this.cursor?.nativeElement) {
      gsap.set(this.cursor.nativeElement, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }

    // Animate skills when they come into view
    if (this.skillsList?.nativeElement) {
      const skillItems = this.skillsList.nativeElement.children;

      gsap.from(skillItems, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: this.skillsList.nativeElement,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }

  skills: string[] = [
    'Angular', 'TypeScript', 'RxJS', 'NgRx', 'Angular Material',
    'Angular Universal', 'Jasmine', 'Karma', 'Angular CLI',
    'Angular Forms', 'Angular Router', 'Angular Animations',
    'REST APIs', 'HTML5', 'CSS3', 'SCSS', 'JavaScript ES6+',
    'Git', 'npm', 'Webpack', 'Jest', 'CI/CD'
  ];

  contactData = {
    name: '',
    company: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.contactData);
    alert('Thank you for your message! I will get back to you soon.');
    this.contactData = {
      name: '',
      company: '',
      email: '',
      message: ''
    };
  }

  angularProjects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'Full-featured e-commerce platform with product catalog, cart management, and payment integration.',
      demoUrl: 'https://angular-ecommerce-demo.com',
      technologies: ['Angular', 'NgRx', 'Angular Material', 'Stripe']
    },
    {
      title: 'Task Management System',
      description: 'Project management tool with real-time updates, task tracking, and team collaboration features.',
      demoUrl: 'https://angular-task-manager.com',
      technologies: ['Angular', 'Firebase', 'RxJS', 'Angular Forms']
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with interactive charts and data visualization.',
      demoUrl: 'https://social-dashboard-demo.com',
      technologies: ['Angular', 'D3.js', 'Angular Material', 'NgRx']
    }
  ];

  reactProjects: Project[] = [
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather tracking app with location-based forecasts.',
      demoUrl: 'https://weather-react-app.com',
      technologies: ['React', 'Redux', 'Weather API']
    },
    {
      title: 'Movie Database',
      description: 'Movie information and review platform using TMDB API.',
      demoUrl: 'https://movie-db-react.com',
      technologies: ['React', 'Context API', 'Styled Components']
    },
    {
      title: 'Chat Application',
      description: 'Real-time chat application with room creation and file sharing.',
      demoUrl: 'https://chat-app-react.com',
      technologies: ['React', 'Socket.io', 'Firebase']
    }
  ];

  jsProjects: Project[] = [
    {
      title: 'Todo List',
      description: 'Simple todo list with local storage persistence.',
      demoUrl: 'https://todo-js-app.com',
      technologies: ['JavaScript', 'HTML5', 'CSS3']
    },
    {
      title: 'Calculator',
      description: 'Scientific calculator with advanced mathematical functions.',
      demoUrl: 'https://calculator-js-app.com',
      technologies: ['JavaScript', 'HTML5', 'CSS3']
    },
    {
      title: 'Memory Game',
      description: 'Card matching memory game with different difficulty levels.',
      demoUrl: 'https://memory-game-js.com',
      technologies: ['JavaScript', 'HTML5', 'CSS3']
    }
  ];
}

bootstrapApplication(App);