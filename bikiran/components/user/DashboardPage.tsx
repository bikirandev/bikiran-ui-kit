import Image from "next/image";
import React from "react";
import imgDashboard from "../../../public/assets/images/img-dashboard.png";
import { dashboardData } from "./constant";

const DashboardPage = () => {
  return (
    <section className="container mt-10">
      <div className="border-b border-[#FFFFFF]/10 pb-3">
        <h2 className="font-medium text-xl md:text-3xl">Dashboard</h2>
      </div>
      <div className="mt-10">
        <div>
          <Image
            src={imgDashboard}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto opacity-100 group-hover:opacity-0 transition-all duration-500"
          />
        </div>
        <div className="grid justify-center gap-3 md:flex md:justify-between md:gap-4 pt-10">
          {dashboardData.map((item) => (
            <div
              key={item.id}
              className={`grid gap-2 border border-[#FFFFFF]/10 rounded-20 bg-primary-900 p-4 w-[300px] text-${item.text}`}
            >
              <p className="text-2xl">{item.title}</p>
              <span className="text-4xl">{item.domain}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
