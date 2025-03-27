import React from "react";
import { dashboardData } from "./constant";
import ChartComp from "./ChartComp";
import Footer from "@/bikiran/shared/footer/Footer";

const DashboardPage = () => {
  return (
    <section className="container mt-10 mb-14">
      <div className="border-b border-[#FFFFFF]/10 pb-3">
        <h2 className="font-medium text-xl md:text-3xl">Dashboard</h2>
      </div>
      <div className="mt-10">
        <div>
          {/* <Image
            src={imgDashboard}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          /> */}
          <ChartComp />
        </div>
        <div className="grid justify-center gap-3 md:flex md:justify-between md:gap-4 pt-10">
          {dashboardData.map((item) => (
            <div
              key={item.id}
              className={`grid gap-2 border border-[#FFFFFF]/10 rounded-20 bg-primary-900 p-4 w-[330px] md:w-[300px] text-${item.text}`}
            >
              <p className="text-xl md:text-2xl">{item.title}</p>
              <span className="text-2xl md:text-4xl">{item.domain}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 border-t pt-2 pb-5 border-[#ffff]/10">
        <Footer />
      </div>
    </section>
  );
};

export default DashboardPage;
