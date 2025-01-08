import { 
  Shield, Cpu, Zap, Lock, ShoppingCart, HeadphonesIcon, RefreshCw, Timer, 
  RotateCcw, Monitor, Users, Download, Settings, PlayCircle, AlertCircle,
  Eye, Gamepad2, Menu, Wifi, HardDrive, PackageCheck, CircuitBoard, MonitorCheck,
  HardDriveDownload, ServerCrash, Key
} from 'lucide-react';

export const setupInstructions = [
  {
    icon: Monitor,
    title: "System Requirements",
    content: `
      <div class="space-y-2">
        <span>— Windows 10/11 Home/Pro [1909 - 24H2]</span><br/>
        <span>— BIOS Virtualization (VT-x/SVM/AMD-V) must be <b>enabled</b></span><br/>
        <span>— TPM (Trusted Platform Module) is <b>recommended to be disabled</b></span><br/>
        <span>— All antivirus programs on your PC must be <b>turned off</b></span>
      </div>
    `
  },
  {
    icon: MonitorCheck,
    title: "Overlay Installation",
    content: `
      <div class="space-y-4">
        <div>
          <div class="font-medium mb-2">For NVIDIA GPU:</div>
          <div class="space-y-1">
            <span>• Download and install <a class="text-orange-500 hover:text-orange-400 transition-colors" href="https://www.nvidia.com/en-us/software/nvidia-app/" target="_blank">Nvidia App</a></span><br/>
            <span>• Enable in-game overlay in GeForce Experience settings</span><br/>
            <span>• Make sure the overlay is working by pressing Alt+Z</span>
          </div>
        </div>
        <div>
          <div class="font-medium mb-2">For AMD GPU:</div>
          <div class="space-y-1">
            <span>• Download and install <a class="text-orange-500 hover:text-orange-400 transition-colors" href="https://steelseries.com/gg/downloads/gg/latest/windows" target="_blank">SteelSeries GG software</a></span><br/>
            <span>• Enable SteelSeries Sonar in settings</span><br/>
            <span>• Navigate to Settings → Sonar Shortcuts</span><br/>
            <span>• Set up a custom key bind for the overlay</span><br/>
            <span>• Test the overlay by pressing your configured key bind</span>
          </div>
        </div>
      </div>
    `
  },
  {
    icon: Download,
    title: "How to Inject",
    content: `
      <div class="space-y-2">
        <span>— Ensure that the <b>overlay</b> is active</span><br/>
        <span>— Download the <b>loader</b></span><br/>
        <span>— Make sure that the <b>game</b> is closed</span><br/>
        <span>— Open the loader, either from the <b>local disk</b> or from a <b>USB drive</b></span><br/>
        <span>— <b>Right-click</b> to paste your license key</span><br/>
        <span>— Follow the instructions shown in the <b>loader</b></span><br/>
        <span>— Upon the first injection, the PC will <b>restart</b>, after which a second injection is required</span><br/>
        <span>— Once the <b>message box</b> confirms a successful injection, you may <b>start the game</b></span><br/>
      </div>
    `
  }
];

export const troubleshootingItems = [
  {
    icon: AlertCircle,
    title: "Incorrect HWID",
    content: `
      <div class="space-y-2">
        <span>Open <b>CMD as administrator, enter these commands one by one:</b></span><br/>
<span></span><br/>
<span>wmic diskdrive get Caption, SerialNumber</span><br/>

<span>wmic baseboard get SerialNumber</span><br/>
<span></span><br/>
<span>If any of those commands failed with an error then something is wrong with your PC, try to reinstall Windows and check if the problem is gone.</span><br/>
      </div>
    `
  },
  {
    icon: Gamepad2,
    title: "Binds are not working properly",
    content: `
      <div class="space-y-2">
        <span>Delete <code>client.cfg</code> and <code>keys.cfg</code> from the Rust folder: <code>C:\\Program Files (x86)\\Steam\\steamapps\\common\\Rust\\cfg</code>, and then reinject.</span>
      </div>
    `
  },
  {
    icon: Menu,
    title: "Menu is not clickable",
    content: `
      <div class="space-y-2">
        <span>Run your overlay app as administrator:</b>:</span>
        <ul>
          <li><b>NVIDIA</b>: <code>C:\\Program Files\\NVIDIA Corporation\\NVIDIA GeForce Experience\\NVIDIA Share.exe</code> -> <b>Properties</b> -> <b>Compatibility</b> -> <b>Run this program as an administrator</b> (ON).</li>
          
          <li><b>AMD</b>: Run <b>SteelSeries GG</b> as administrator.</li>
        </ul>
      </div>
    `
  },
  {
    icon: Wifi,
    title: "Unknown network error",
    content: `
      <div class="space-y-2">
        <span>There may be an issue with your internet connection. Please ensure it is stable, and consider disabling any VPN programs.</span>
      </div>
    `
  },
  {
    icon: HardDrive,
    title: "Failed to allocate memory",
    content: `
      <div class="space-y-2">
        <span>1.Make sure that you have 16 or more RAM in your PC.</span><br/>
<span>2.Disable everything in startup and run the loader right away after rebooting your PC.</span><br/>
<span>3.Make sure that loader located on PC and not on cloud space (e.g OneDrive, Mega.nz).</span><br/>
      </div>
    `
  },
  {
    icon: PackageCheck,
    title: "Failed to load dependencies",
    content: `
      <div class="space-y-2">
        <span>Ensure that all <b>antivirus programs</b> are disabled. If the issue persists, try disabling all programs in the <b>startup (autorun)</b> list.</span>
      </div>
    `
  },
  {
    icon: CircuitBoard,
    title: "VMX/SVM is not supported",
    content: `
      <div class="space-y-2">
        <span><b>Hyper-V</b> and <b>Virtual Machine Platform</b> must be disabled in <b>Windows Features</b>:</span>
        <ul>
          <li>Go to <b>Control Panel</b> -> <b>Turn Windows features on or off</b> -> <b>Disable "Virtual Machine Platform" and "Hyper-V</b>."</li>
          <li>Open <b>CMD</b> and type <code>bcdedit /set hypervisorlaunchtype off</code>.</li>
          <li>Restart your PC afterward.</li>
        </ul>
      </div>
    `
  },
  {
    icon: MonitorCheck,
    title: "Failed to initialize render",
    content: `
      <div class="space-y-2">
        <span>Disable <b>SteelSeries Moments</b> and enable <b>SteelSeries Sonar</b>.</span>
      </div>
    `
  },
  {
    icon: HardDriveDownload,
    title: "Either virtual or RAID disk is present",
    content: `
      <div class="space-y-2">
        <span>Turn off <b>RAID</b> in the BIOS and disable <b>Intel Rapid Storage Technology (RST)</b>. If this doesn't resolve the issue, try <b>reinstalling Windows</b>.</span>
      </div>
    `
  },
  {
    icon: AlertCircle,
    title: "Loader closing without any error or menu does not appear",
    content: `
      <div class="space-y-2">
      <span>Install the required library: <a class="text-orange-500 hover:text-orange-400 transition-colors" href="https://aka.ms/vs/17/release/vc_redist.x64.exe" target="_blank">vc_redist.x64.exe</a></span>
      </div>
    `
  },
  {
    icon: ServerCrash,
    title: "No available servers were found",
    content: `
      <div class="space-y-2">
        <span>Check the news in our <a class="text-orange-500 hover:text-orange-400 transition-colors" href="https://dsc.gg/exoac" target="_blank">Discord channel</a> (Servers may be under maintenance).</span>
      </div>
    `
  },
  {
    icon: Key,
    title: "AES instruction set is not supported",
    content: `
      <div class="space-y-2">
        <span>Your CPU does not support <b>AES instructions</b>, or AES is disabled in the <b>BIOS</b>.</span>
      </div>
    `
  }
];

export const faqItems = [
  { 
    icon: Lock,
    title: "Are your cheats safe to use?",
    content: `
      <div class="space-y-2">
        <span>We prioritize <b>safety</b> and strive to make our cheats as <b>undetectable</b> as possible. However, using cheats <b>always carries some risk of a ban</b>, so we recommend using them at your own discretion.</span>
      </div>
    `
  },
  { 
    icon: Shield,
    title: "Will my data be secure?",
    content: `
      <div class="space-y-2">
        <span><b>Yes</b>, we use <b>data encryption</b> and do not store your personal information longer than necessary for transactions.</span>
      </div>
    `
  },
  { 
    icon: ShoppingCart,
    title: "How can I purchase?",
    content: `
      <div class="space-y-2">
        <span>To purchase cheats, select the cheat you're interested in, add it to the <b>cart</b>, and complete the payment. We support popular payment methods, including <b>credit cards</b> and <b>cryptocurrency</b> for full anonymity.</span>
      </div>
    `
  },
  { 
    icon: HeadphonesIcon,
    title: "Do you provide support?",
    content: `
      <div class="space-y-2">
        <span><b>Yes</b>, our support team is available <b>24/7</b> to assist with <b>installation</b>, <b>setup</b>, and any <b>technical issues</b>. We aim to keep our customers satisfied and supported.</span>
      </div>
    `
  },
  { 
    icon: RefreshCw,
    title: "How often do you update?",
    content: `
      <div class="space-y-2">
        <span><b>Yes</b>, we update our cheats after each game update to ensure they continue to work and remain <b>undetectable</b>.</span>
      </div>
    `
  },
  { 
    icon: Timer,
    title: "How quick is activation?",
    content: `
      <div class="space-y-2">
        <span>Access to the cheats is provided <b>automatically</b> as soon as the <b>payment</b> is confirmed. You will receive <b>installation instructions</b> and be able to start using the cheats within <b>minutes</b>.</span>
      </div>
    `
  },
  { 
    icon: RotateCcw,
    title: "What's your refund policy?",
    content: `
      <div class="space-y-2">
        <span>We have a <b>refund policy</b> available publicly <a class="text-orange-500 hover:text-orange-400 transition-colors" href="https://exodus.fun/refund-policy" target="_blank">there</a></span>.  
      </div>
    `
  },
  { 
    icon: Monitor,
    title: "System requirements?",
    content: `
      <div class="space-y-2">
        <span>— Windows 10 Home/Pro<br />— Windows 11 Home/Pro</span>
      </div>
    `
  },
  { 
    icon: Users,
    title: "Can I become a reseller?",
    content: `
      <div class="space-y-2">
        <span>Yes, we offer a <b>reseller program</b> for those interested in distributing our products. If you're interested, please contact us on <a class="text-orange-500 hover:text-orange-400 transition-colors" href="https://dsc.gg/exoac" target="_blank">Discord</a> for more details on the requirements and terms of the program.</span>
      </div>
    `
  }
];