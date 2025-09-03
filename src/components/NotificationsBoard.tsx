"use client";

import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { Badge } from "antd";
import { FiBell } from "react-icons/fi";
import {
  FiCreditCard,
  FiRefreshCcw,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

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
  onMarkAsRead: (id: number) => void;
  backgroundImage?: string;
}

const typeIcon = (type: string) => {
  switch (type) {
    case "pembayaran":
      return <FiCreditCard size={20} />;
    case "perpanjangan":
      return <FiRefreshCcw size={20} />;
    case "lewat-pembayaran":
    case "lewat-perpanjangan":
      return <FiAlertTriangle size={20} className="text-red-600" />;
    case "approved":
      return <FiCheckCircle size={20} className="text-green-600" />;
    case "tidak-approved":
      return <FiXCircle size={20} className="text-red-600" />;
    default:
      return <FiCreditCard size={20} />;
  }
};

export const NotificationBoard: FC<NotificationBoardProps> = ({
  notifications,
  onMarkAsRead,
  backgroundImage,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="w-full rounded-lg overflow-hidden shadow-lg m-0 p-0">
        <CardHeader className="flex items-center justify-between bg-[#223D3C] text-white p-4">
          <div className="flex items-center space-x-2">
            <Badge
              count={notifications.length}
              overflowCount={99}
              style={{ backgroundColor: "#ff4d4f" }}
            >
              <FiBell size={30} className="text-white" />
            </Badge>
            <h2 className="text-lg font-semibold ml-6">Pemberitahuan</h2>
          </div>
        </CardHeader>
        <CardContent
          className="p-4 -mt-6"
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          <ScrollArea className="max-h-[400px] w-full overflow-y-auto m-0">
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-300/70 hover:bg-gray-500/80 transition"
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="flex-shrink-0 mt-1">{typeIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{notif.user}</p>
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <span className="text-xs text-gray-800 mr-2">{notif.date}</span>
                      <span className="text-xs text-gray-500">{notif.time}</span>
                    </div>
                  </div>
                  <ShadcnBadge
                    variant="outline"
                    className="mt-2 sm:mt-0 sm:ml-4 cursor-pointer"
                    onClick={() => onMarkAsRead(notif.id)}
                  >
                    Mark as read
                  </ShadcnBadge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <Card className="p-4 bg-white rounded-lg shadow w-full">
          <h3 className="text-sm font-medium text-gray-600">Slot Makam Ditempati</h3>
          <p className="text-xl font-semibold text-gray-900">37</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow w-full">
          <h3 className="text-sm font-medium text-gray-600">Slot Makam Kosong</h3>
          <p className="text-xl font-semibold text-gray-900">55</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow w-full">
          <h3 className="text-sm font-medium text-gray-600">Slot Makam Ditempati</h3>
          <p className="text-xl font-semibold text-gray-900">37</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow w-full">
          <h3 className="text-sm font-medium text-gray-600">Slot Makam Kosong</h3>
          <p className="text-xl font-semibold text-gray-900">55</p>
        </Card>
      </div>
    </div>
  );
};
