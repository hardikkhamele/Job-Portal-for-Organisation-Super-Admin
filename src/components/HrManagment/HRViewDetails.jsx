import React, { useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import hrPerformanceData from "./HRPerformance/hrPerformanceData";

function HRViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Find the exact HR record based on URL ID
  const rawHr = useMemo(() => {
    return hrPerformanceData.find((h) => String(h.id) === String(id));
  }, [id]);

  const dateAnalyticsFilter = searchParams.get("dateAnalytics") || "today";

  const updateParams = (newParams) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      return params;
    }, { replace: true });
  };

  const hr = useMemo(() => {
    if (!rawHr) return null;
    
    // Modify based on date
    const dateModifier = dateAnalyticsFilter === "yesterday" ? 0.8 : dateAnalyticsFilter === "day_before_yesterday" ? 0.7 : dateAnalyticsFilter === "current_week" ? 5 : dateAnalyticsFilter === "previous_week" ? 4.5 : 1;
    const targetMod = dateModifier > 1 ? dateModifier / 1.5 : dateModifier;

    return {
      ...rawHr,
      target: Math.floor(rawHr.target * targetMod),
      callsToday: Math.floor(rawHr.callsToday * dateModifier),
      candidatesOnboarded: Math.floor(rawHr.candidatesOnboarded * dateModifier),
      vacanciesFilled: Math.floor(rawHr.vacanciesFilled * dateModifier),
    };
  }, [rawHr, dateAnalyticsFilter]);

  const getPipe = (val, mult, add) => Math.floor(val * mult) + add;

  const processing = hr ? getPipe(hr.candidatesOnboarded, 1.4, 1) : 0;
  const rejected = hr ? getPipe(hr.candidatesOnboarded, 0.7, 0) : 0;
  const onHold = hr ? getPipe(hr.candidatesOnboarded, 0.3, 2) : 0;

  const chartData = useMemo(() => {
    if (!rawHr) return [];

    const getVal = (modifier, mult, add) => {
      const base = Math.floor(rawHr.candidatesOnboarded * modifier);
      return Math.floor(base * mult) + add;
    };

    const cat = (name, mult, add) => ({
      name,
      Today: getVal(1, mult, add),
      Yesterday: getVal(0.8, mult, add),
      "Day before yst": getVal(0.7, mult, add),
      "Current week": getVal(5, mult, add),
      "Previous week": getVal(4.5, mult, add),
    });

    return [
      cat("Processing", 1.4, 1),
      cat("Onboarded", 1, 0),
      cat("Rejected", 0.7, 0),
      cat("On Hold", 0.3, 2),
      cat("Today Join", 0.1, 1),
      cat("Tmrw Join", 0.2, 0),
    ];
  }, [rawHr]);

  if (!hr) {
    return (
      <div className="w-full min-h-screen bg-[#F4F6FA] flex items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-xl border border-[#E4E4E1] shadow-sm text-center">
          <h2 className="text-[15px] font-bold text-[#14161A] mb-2">HR Not Found</h2>
          <p className="text-[13px] text-[#5B616E] mb-6">The HR recruiter record could not be found.</p>
          <button
            onClick={() => navigate("/hr-management")}
            className="bg-[#3B5BDB] text-white px-5 py-2 rounded-lg text-[13px] font-bold transition"
          >
            Back to HR Management
          </button>
        </div>
      </div>
    );
  }

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-4 px-4 text-[13px] font-medium text-[#5B616E]">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-[3px]"
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] p-4 md:p-8 font-sans text-[#14161A]">
      <div className="max-w-[1100px] mx-auto bg-white rounded-2xl shadow-sm border border-[#E4E4E1] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate("/hr-management")} 
              className="text-[#5B616E] hover:text-[#14161A] transition cursor-pointer md:hidden -ml-2"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="w-16 h-16 rounded-xl bg-[#3B5BDB] text-white font-bold flex items-center justify-center text-2xl shrink-0 shadow-sm">
              {hr.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-[#14161A] tracking-tight">{hr.name}</h1>
              <div className="text-[13.5px] text-[#5B616E] flex flex-wrap items-center gap-2.5 mt-1 font-medium">
                <span>{hr.designation}</span>
                <span className="text-[#E4E4E1]">|</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${hr.isActiveToday ? 'bg-[#0F9D6C]' : 'bg-[#D64545]'}`}></span>
                  <span className={hr.isActiveToday ? 'text-[#0F9D6C]' : 'text-[#D64545]'}>{hr.isActiveToday ? 'Active' : 'Offline'}</span>
                </div>
                <span className="text-[#E4E4E1]">|</span>
                <span>{hr.jobType}, Onsite</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-12 md:mt-2">
            <div className="flex flex-col">
              <span className="text-[13px] text-[#868C98] mb-1 font-medium">Email</span>
              <span className="font-semibold text-[#14161A] tabular-nums">{hr.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#868C98] mb-1 font-medium">Phone</span>
              <span className="font-semibold text-[#14161A] tabular-nums">{hr.phone}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 border-b border-[#E4E4E1] overflow-x-auto">
          <div className="flex gap-8">
            {[
              { id: "today", label: "Today" },
              { id: "yesterday", label: "Yesterday" },
              { id: "day_before_yesterday", label: "Day Before Yst" },
              { id: "current_week", label: "Current Week" },
              { id: "previous_week", label: "Previous Week" },
            ].map((tab) => {
              const isActive = dateAnalyticsFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => updateParams({ dateAnalytics: tab.id })}
                  className={`pb-3 text-[14px] font-semibold border-b-[3px] transition-colors cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? "border-[#3B5BDB] text-[#3B5BDB]" 
                      : "border-transparent text-[#5B616E] hover:text-[#14161A]"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-8 pb-10">
          
          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E4E4E1] rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#E4E4E1] shadow-sm mb-8">
            
            <div className="p-6 flex flex-col justify-center">
              <div className="text-[54px] leading-[1] font-bold text-[#14161A] tabular-nums tracking-tight mb-2">{hr.target}</div>
              <div className="text-[14px] text-[#5B616E] mb-0.5">Daily target</div>
              <div className="text-[13px] text-[#868C98] font-medium">calls</div>
            </div>

            <div className="p-6 flex flex-col justify-center">
              <div className="text-[54px] leading-[1] font-bold text-[#3B5BDB] tabular-nums tracking-tight mb-2">{hr.callsToday}</div>
              <div className="text-[14px] text-[#5B616E] mb-0.5">Calls done</div>
              <div className="text-[13px] text-[#868C98] font-medium">
                {hr.target > 0 ? Math.round((hr.callsToday / hr.target) * 100) : 0}% of target
              </div>
            </div>

            <div className="p-6 flex flex-col justify-center">
              <div className="text-[54px] leading-[1] font-bold text-[#0F9D6C] tabular-nums tracking-tight mb-2">{hr.candidatesOnboarded}</div>
              <div className="text-[14px] text-[#5B616E] mb-0.5">Total onboarded</div>
              <div className="text-[13px] text-[#868C98] font-medium">all-time</div>
            </div>

            <div className="p-6 flex flex-col justify-center">
              <div className="text-[54px] leading-[1] font-bold text-[#14161A] tabular-nums tracking-tight mb-2">{hr.vacanciesFilled}</div>
              <div className="text-[14px] text-[#5B616E] mb-0.5">Vacancies filled</div>
              <div className="text-[13px] text-[#868C98] font-medium">all-time</div>
            </div>
            
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div>
                <h3 className="text-[14px] text-[#5B616E] font-medium mb-4 mt-2">Today's activity pipeline</h3>
                <div className="border border-[#E4E4E1] rounded-xl flex flex-col divide-y divide-[#E4E4E1] shadow-sm bg-white">
                  {[
                    { label: "Processing", val: processing, color: "bg-[#D68227]" },
                    { label: "Onboarded", val: hr.candidatesOnboarded, color: "bg-[#3B5BDB]" },
                    { label: "Rejected", val: rejected, color: "bg-[#D64545]" },
                    { label: "On hold", val: onHold, color: "bg-[#5B616E]" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-[3px] ${item.color}`}></div>
                        <span className="text-[15px] font-bold text-[#14161A]">{item.label}</span>
                      </div>
                      <span className="text-[16px] font-bold text-[#14161A] tabular-nums">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E4E4E1] pt-6 mt-1">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4">
                    <span className="text-[14px] font-medium text-[#5B616E] pt-2 whitespace-nowrap min-w-max">Roles handled</span>
                    <div className="flex flex-wrap gap-2">
                      {hr.vacanciesFilledList.split(",").map(r => r.trim()).map((role, i) => (
                        <span key={i} className="text-[13px] font-semibold text-[#3B5BDB] bg-[#EEF1FD] px-3.5 py-1.5 rounded-lg whitespace-nowrap border border-[#3B5BDB]/10">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Chart */}
            <div className="lg:col-span-7 border border-[#E4E4E1] rounded-xl p-6 flex flex-col shadow-sm bg-white h-[400px]">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-[16px] leading-tight font-bold text-[#14161A]">
                  Timeline performance<br />comparison
                </h3>
                <span className="text-[14px] leading-tight font-medium text-[#5B616E] text-right">
                  All<br />timeframes
                </span>
              </div>
              
              <div className="flex-1 w-full min-h-0 relative -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={2} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={{stroke: "#E4E4E1"}} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: "#5B616E", fontWeight: 500 }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: "#868C98", fontWeight: 500 }} 
                      tickCount={5}
                    />
                    <Tooltip 
                      cursor={{ fill: "#F9FAFB" }} 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }} 
                      itemStyle={{ fontSize: 13, fontWeight: 600, color: '#14161A', paddingTop: 3, paddingBottom: 3 }}
                      labelStyle={{ fontSize: 12, color: '#5B616E', marginBottom: 8, fontWeight: 600 }}
                    />
                    <Legend content={renderCustomLegend} verticalAlign="bottom" />
                    
                    <Bar dataKey="Today" fill="#9B86DB" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Yesterday" fill="#3B5BDB" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Day before yst" fill="#0F9D6C" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Current week" fill="#E68A2E" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Previous week" fill="#D64545" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default HRViewDetails;