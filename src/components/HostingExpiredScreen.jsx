import { AlertTriangle, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import developerImage from "../assets/developer.jpg";
 
const HostingExpiredScreen = () => {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-200 px-8 pt-8 pb-6 text-center">
          {/* Developer Avatar */}
          <img
            src={developerImage} // Replace with your image
            alt="Developer"
            className="mx-auto h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="text-red-500" size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Website Temporarily Unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            The free hosting plan for this website has expired.
            <br />
            Please contact the developer to restore the service.
          </p>
        </div>

        {/* Contact Section */}

        <div className="space-y-4 p-6">
          <a
            href="https://wa.me/923411918094"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-4 transition hover:border-green-500 hover:bg-green-100"
          >
            <div className="rounded-lg bg-green-600 p-3 text-white">
              <MessageCircle size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">WhatsApp</p>

              <p className="font-semibold text-slate-800">+92 341 1918094</p>
            </div>
          </a>

          <a
            href="mailto:hamadqur447@gmail.com"
            className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-500 hover:bg-slate-50"
          >
            <div className="rounded-lg bg-emerald-600 p-3 text-white">
              <Mail size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-slate-500">Email</p>

              <p className="truncate font-semibold text-slate-800">
                hamadqur447@gmail.com
              </p>
            </div>
          </a>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-center gap-2 rounded-b-2xl border-t border-slate-200 bg-slate-50 px-6 py-4">
          <ShieldCheck size={18} className="text-emerald-600" />

          <p className="text-center text-sm text-slate-600">
            Service will resume immediately after the hosting is renewed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostingExpiredScreen;
