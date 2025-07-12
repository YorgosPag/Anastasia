import { Globe, LucideProps, PanelLeft } from "lucide-react";
import type { SocialMedia } from "@/lib/types";

export const PhoneIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const MailIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const GlobeIcon = Globe;
export const BuildingIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
  </svg>
);
export const UserIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
export const UsersIcon = (props: LucideProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const FileTextIcon = (props: LucideProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);

export const HashIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" />
  </svg>
);
export const MapPinIcon = (props: LucideProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
export const ArrowLeft = (props: LucideProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export const SidebarIcon = (props: LucideProps) => (
    <PanelLeft {...props} />
);

export const LogoIcon = (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 13.9757 21.5244 15.8213 20.6924 17.4423" />
      <path d="M12 6V12L16 16" />
    </svg>
);

const WhatsAppIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M16.75 13.96c.25.13.41.2.52.32.11.12.15.35.04.68-.11.34-.68.65-1.19.78-.5.13-1.04.2-1.65.08-.6-.12-1.28-.35-1.95-1.03-.67-.67-1.12-1.4-1.32-2.12-.2-.72-.1-1.28.2-1.75.3-.47.6-.6.8-.6.2.0.35.03.45.03.1.0.2.0.28.2.08.2.28.68.32.75.04.07.08.16.04.25-.04.09-.08.13-.16.21-.08.08-.16.16-.25.25-.08.08-.16.16-.08.33.08.16.45.75.93 1.24.48.48 1.05.85 1.21.93.16.08.24,0,.32-.08.08-.08.16-.16.24-.24.08-.08.16-.16.24-.12.08.04.56.28.71.36.15.08.25.12.29.2zM12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.45 1.26 4.96L2 22l5.04-1.26c1.51.8 3.18 1.26 4.96 1.26 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
);
const ViberIcon = (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 12.02c.2-.21.2-.55 0-.76l-1.49-1.49c-.21-.21-.55-.21-.76 0l-.33.33c-.27.27-.24.72.05 1.02.5.5.54.72.54 1.27 0 .5-.19.68-.54 1.12-.29.31-.32.76-.05 1.03l.33.33c.21.2.55.2.76 0l1.49-1.49zm-5.45-3.69c.19-.29.15-.68-.09-.92L10.2 6.04c-.23-.23-.62-.23-.85 0l-.33.33c-.27.27-.24.72.05 1.02.5.5.54.72.54 1.27 0 .5-.19.68-.54 1.12-.29.31-.32.76-.05 1.03l.33.33c.23.24.62.24.85 0l1.73-1.73zm12-3.32C24 2.69 21.31 0 18 0H6C2.69 0 0 2.69 0 6v12c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6V5.01zM7.26 18.06c-1.39-1.22-2.2-2.9-2.2-4.73s.81-3.51 2.2-4.73l.28-.24c.2-.17.51-.15.68.05l.38.47c.18.22.16.54-.04.73l-.28.24c-.79.69-1.28 1.7-1.28 2.8s.49 2.11 1.28 2.8l.28.24c.2.19.22.51.04.73l-.38.47c-.17.2-.48.22-.68.05l-.28-.25z"/></svg>
);
const TelegramIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.22-.25-.08-.37-.38-.13L5.42 12.39L2.1 11.23c-.62-.2-1.04.28-.83.92L4.03 16.8c.18.53.58.65 1.02.43l3.2-2.27l3.75 2.7c.5.38.9.18 1.04-.46z" /></svg>
);
const FacebookIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" /></svg>
);
const InstagramIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.74 2 8.47 2.02 7.37 2.07c-1.1.05-1.87.22-2.55.47c-.68.25-1.29.6-1.9 1.2c-.6.61-.95 1.22-1.2 1.9c-.25.68-.42 1.45-.47 2.55C2.02 8.47 2 8.74 2 12s.02 3.53.07 4.63c.05 1.1.22 1.87.47 2.55c.25.68.6 1.29 1.2 1.9c.61.6 1.22.95 1.9 1.2c.68.25 1.45.42 2.55.47c1.1.05 1.37.07 4.63.07s3.53-.02 4.63-.07c1.1-.05 1.87-.22 2.55-.47c.68-.25 1.29-.6 1.9-1.2c.6-.61.95-1.22 1.2-1.9c.25-.68.42-1.45.47-2.55c.05-1.1.07-1.37.07-4.63s-.02-3.53-.07-4.63c-.05-1.1-.22-1.87-.47-2.55c-.25-.68-.6-1.29-1.2-1.9c-.61-.6-1.22-.95-1.9-1.2c-.68-.25-1.45-.42-2.55-.47C15.53 2.02 15.26 2 12 2zm0 1.8c3.2 0 3.58.01 4.85.07c.98.04 1.59.22 1.98.37c.49.19.82.38 1.15.71c.33.33.52.66.71 1.15c.15.39.33 1 .37 1.98c.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.04.98-.22 1.59-.37 1.98c-.19.49-.38.82-.71 1.15c-.33.33-.66.52-1.15.71c-.39.15-1 .33-1.98.37c-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-.98-.04-1.59-.22-1.98-.37c-.49-.19-.82-.38-1.15-.71c-.33-.33-.52-.66-.71-1.15c-.15-.39-.33-1-.37-1.98c-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.04-.98.22-1.59.37-1.98c.19-.49.38.82.71-1.15c.33-.33.66.52 1.15.71c.39-.15 1-.33 1.98-.37c1.27-.06 1.65-.07 4.85-.07zM12 7.25c-2.62 0-4.75 2.13-4.75 4.75S9.38 16.75 12 16.75s4.75-2.13 4.75-4.75S14.62 7.25 12 7.25zm0 7.7c-1.62 0-2.95-1.32-2.95-2.95s1.32-2.95 2.95-2.95s2.95 1.32 2.95 2.95s-1.32 2.95-2.95 2.95zm4.8-7.85c-.58 0-1.05-.47-1.05-1.05s.47-1.05 1.05-1.05s1.05.47 1.05 1.05s-.47 1.05-1.05 1.05z"/></svg>
);
const TikTokIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.16 0 13.77.12 14.33.33c.56.21 1.08.53 1.53.95.45.42.82.93 1.08 1.5.27.57.4 1.2.4 1.88v.02c0 .28-.02.56-.05.83-.03.27-.08.53-.15.79-.07.26-.15.51-.25.75-.1.24-.22.48-.36.71l-.01.02c-1.4-2.81-4.1-4.66-7.14-4.66-2.5 0-4.68 1.4-5.74 3.44-.2.37-.36.77-.47 1.2-.12.42-.18.86-.18 1.32v.01c0 2.85 2.31 5.16 5.16 5.16.42 0 .84-.05 1.24-.15.4-.1.78-.24 1.14-.42.36-.18.7-.4 1.02-.66.32-.26.6-.56.84-.9l.01-.01c.82 2.1 2.9 3.6 5.35 3.6 2.5 0 4.68-1.4 5.74-3.44.2-.37.36-.77.47-1.2.12-.42.18-.86.18 1.32v-.01c0-2.85-2.31-5.16-5.16-5.16-.42 0-.84.05-1.24.15-.4.1-.78.24-1.14.42-.36-.18-.7.4-1.02.66-.32.26-.6.56-.84.9z"/></svg>
);
const LinkedInIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-11.5 6H5.5v9h3v-9zM7 7.25c.83 0 1.5-.67 1.5-1.5S7.83 4.25 7 4.25s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM18.5 10c-1.87 0-3.32.96-3.83 2.13V10h-3v9h3v-4.5c0-1.24.7-2.5 2.25-2.5s1.75 1.26 1.75 2.5V19h3v-5.5c0-2.8-1.9-4.5-4.67-4.5z"/></svg>
);
const YouTubeIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19c-.23-.86-1.03-1.65-1.9-1.87C17.88 5 12 5 12 5s-5.88 0-7.68.32c-.87.23-1.67 1.02-1.9 1.87C2 8.05 2 12 2 12s0 3.95.42 4.81c.23.86 1.03 1.65 1.9 1.87C6.12 19 12 19 12 19s5.88 0 7.68-.32c.87-.23 1.67-1.02 1.9-1.87C22 15.95 22 12 22 12s0-3.95-.42-4.81zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
);
const XIcon = (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
)

export const MessageIcons = {
    whatsapp: WhatsAppIcon,
    viber: ViberIcon,
    telegram: TelegramIcon
}

export const BrandIcons = ({ platform, ...props }: { platform: SocialMedia['platform']} & LucideProps) => {
    switch (platform) {
        case 'facebook': return <FacebookIcon {...props} />;
        case 'instagram': return <InstagramIcon {...props} />;
        case 'tiktok': return <TikTokIcon {...props} />;
        case 'linkedin': return <LinkedInIcon {...props} />;
        case 'youtube': return <YouTubeIcon {...props} />;
        case 'x': return <XIcon {...props} />;
        case 'website': return <GlobeIcon {...props} />;
        default: return <GlobeIcon {...props} />;
    }
}