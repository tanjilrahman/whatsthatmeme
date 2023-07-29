import { useEffect, useState } from "react";

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
    <div>
      {deferredPrompt && (
        <button onClick={handleInstall} className="bg-blue-500 text-white rounded p-2">
          Install App
        </button>
      )}
    </div>
  );
};

export default PWAInstallButton;
