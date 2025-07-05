"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@modules/dashboard/components/DashboardHeader";
import { ClassSelector } from "@modules/dashboard/components/ClassSelector";
import { DateRangePicker } from "@modules/dashboard/components/DateRangePicker";
import { Card, CardContent } from "@shared/components/ui/card";
import { ClassSummaryCards } from "@modules/dashboard/components/ClassSummaryCards";
import { TokenEvolutionChart } from "@modules/dashboard/components/TokenEvolutionChart";
import { InteractionsBarChart } from "@modules/dashboard/components/InteractionsPieChart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";
import { CategoryRadarChart } from "@modules/dashboard/components/CategoryRadarChart";
import { TopStudentsRanking } from "@modules/dashboard/components/TopStudentsRanking";
import { ActivityTimeline } from "@modules/dashboard/components/ActivityTimeline";
import { Skeleton } from "@shared/components/ui/skeleton";
import { dashboardService } from "@modules/dashboard/services/dashboard.service";
import {
  IClassMetric,
  IDashboardMetric,
} from "@modules/dashboard/interfaces/IDashboard";
import { DateRange } from "react-day-picker";
import { Markdown } from "@shared/components/Markdown";
import { formatDateInBrazil } from "@shared/utils/format-date";

const fetchDashboardData = async () => {
  const response = await dashboardService.getMetrics();
  return response;
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<IDashboardMetric | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // get last month range
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setDate(1);
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: lastMonth,
    to: today,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);

        // Set the first class with data as the default selected class
        const classesWithData = Object.entries(data.metrics)
          .filter(([_, metrics]) => (metrics as IClassMetric[]).length > 0)
          .map(([classCode]) => classCode);

        if (classesWithData.length > 0) {
          setSelectedClass(classesWithData[0]);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getClassMetrics = (classCode: string | null) => {
    if (!classCode || !dashboardData) return [];
    return dashboardData.metrics[classCode] || [];
  };

  const handleClassChange = (classCode: string) => {
    setSelectedClass(classCode);
  };

  const classMetrics = getClassMetrics(selectedClass);
  const hasData = classMetrics.length > 0;

  const filteredMetrics = classMetrics.filter((metric: IClassMetric) => {
    if (!dateRange.from && !dateRange.to) return true;

    const metricDate = new Date(metric.timestamp);

    if (dateRange.from && dateRange.to) {
      return metricDate >= dateRange.from && metricDate <= dateRange.to;
    }

    if (dateRange.from) {
      return metricDate >= dateRange.from;
    }

    if (dateRange.to) {
      return metricDate <= dateRange.to;
    }

    return true;
  });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Header */}
        <DashboardHeader />

        <div className="flex-1 p-6 pt-8">
          {isLoading ? (
            <div className="grid gap-6">
              <Skeleton className="h-[60px] w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-[180px] rounded-2xl" />
                <Skeleton className="h-[180px] rounded-2xl" />
                <Skeleton className="h-[180px] rounded-2xl" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-[300px] rounded-2xl" />
                <Skeleton className="h-[300px] rounded-2xl" />
              </div>
              <Skeleton className="h-[400px] rounded-2xl" />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <ClassSelector
                  classes={Object.keys(dashboardData?.metrics || {})}
                  selectedClass={selectedClass}
                  onClassChange={handleClassChange}
                />
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={(range) => {
                    setDateRange({
                      from: range.from,
                      to: range.to,
                    });
                  }}
                />
              </div>

              {!hasData ? (
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <p className="text-lg text-center text-gray-500 dark:text-gray-400">
                      Não há dados disponíveis para esta turma. Selecione uma
                      turma diferente ou aguarde a coleta de dados.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* 1. Class Summary Cards */}
                  <ClassSummaryCards
                    metrics={filteredMetrics}
                    classCode={selectedClass}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* 2. Token Evolution Chart */}
                    <TokenEvolutionChart metrics={filteredMetrics} />

                    {/* 6. Interactions Pie Chart */}
                    <InteractionsBarChart
                      metrics={dashboardData?.metrics}
                      onClassSelect={handleClassChange}
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">
                      Resumos Diários
                    </h3>

                    {filteredMetrics.map((metric) => (
                      <Card
                        key={metric.timestamp}
                        className="mb-4 py-3 max-h-72 overflow-y-scroll"
                      >
                        <CardContent>
                          <p className="text-sm text-gray-500 mb-2">
                            <strong>Data:</strong>{" "}
                            {formatDateInBrazil(metric.timestamp)}
                          </p>
                          <div className="pl-4">
                            <Markdown>{metric.daily_summary}</Markdown>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* 3. Category Radar Chart */}
                    <Tabs
                      defaultValue="categories"
                      className="w-full bg-white p-3 rounded-2xl shadow-md"
                    >
                      <TabsList className="grid w-full grid-cols-2 bg-white">
                        <TabsTrigger value="categories">Categoria</TabsTrigger>
                        <TabsTrigger value="subcategories">
                          Subcategoria
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="categories">
                        <CategoryRadarChart
                          metrics={filteredMetrics}
                          type="categories"
                        />
                      </TabsContent>
                      <TabsContent value="subcategories">
                        <CategoryRadarChart
                          metrics={filteredMetrics}
                          type="subcategories"
                        />
                      </TabsContent>
                    </Tabs>

                    {/* 4. Top Students Ranking */}
                    <TopStudentsRanking metrics={filteredMetrics} />
                  </div>

                  {/* 5. Activity Timeline */}
                  <div className="mt-6">
                    <ActivityTimeline metrics={filteredMetrics} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
