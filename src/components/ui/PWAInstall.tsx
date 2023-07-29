"use client";
import { useEffect, useState } from "react";
import { MdInstallMobile } from "react-icons/md";

// Custom event type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt(): Promise<void>;
}

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Event handler to capture the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  return (
    <div
      onClick={handleInstall}
      className="text-textDark hover:text-primary cursor-pointer transition-colors duration-200 ease-in-out"
    >
      <MdInstallMobile className="text-2xl mx-auto" />
      <p>Install App</p>
    </div>
  );
};

export default PWAInstallButton;
