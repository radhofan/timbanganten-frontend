"use client";
import { Bell, CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

interface Notification {
  id: number;
  user: string;
  type: string;
  message: string;
  date: string;
  time: string;
}

interface NotificationBoardProps {
  notifications: Notification[];
  handleMarkAsRead: (id: number) => void;
}

export default function NotificationBoard({
  notifications,
  handleMarkAsRead,
}: NotificationBoardProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "tidak-approved":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "lewat-pembayaran":
      case "lewat-perpanjangan":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "approved":
        return "bg-green-50 border-green-200";
      case "tidak-approved":
        return "bg-red-50 border-red-200";
      case "lewat-pembayaran":
      case "lewat-perpanjangan":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center">
          <Bell className="w-8 h-8 mr-3 text-blue-600" />
          Pemberitahuan
        </h2>
        {notifications.length > 0 && (
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {notifications.length} baru
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">Tidak ada pemberitahuan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`${getNotificationColor(notif.type)} border rounded-xl p-5 flex items-start justify-between transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">{getNotificationIcon(notif.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-slate-800">{notif.user}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-slate-500">
                      {notif.date} {notif.time}
                    </span>
                  </div>
                  <p className="text-slate-700">{notif.message}</p>
                </div>
              </div>
              <button
                onClick={() => handleMarkAsRead(notif.id)}
                className="ml-4 text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
