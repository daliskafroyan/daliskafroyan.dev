import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import WakatimeIcon from '../public/static/icons/wakatime-icon.svg';
import GithubIcon from '../public/static/icons/github-icon.svg';

import clsxm from '@/lib/clsxm';

import dashboardDummy from './dashboard-dummy';
import { Anchor } from '@/components/anchor';

const initialMonthsArray = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// TODO
// create generic function out of it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenArray = (arr: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return arr.reduce((flat: any, toFlatten: any) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
    );
  }, []);
};

export default function Dashboard() {
  const [mostActive, setMostActive] = useState(0);
  const [averageActivity, setAverageActivity] = useState(0);
  const [monthsArray, setMonthsArray] = useState<string[]>([]);

  const monthGenerator = useCallback(
    (startMonth: string, monthsArray: string[]) => {
      const startMonthInt = parseInt(`${startMonth[5]}${startMonth[6]}`);
      const newMonths = [
        ...monthsArray.slice(startMonthInt - 1),
        ...monthsArray.slice(0, startMonthInt - 1),
      ];
      return newMonths;
    },
    []
  );

  useEffect(() => {
    const totalContribution =
      dashboardDummy.data.user.contributionsCollection.contributionCalendar.weeks.map(
        (contributions) =>
          contributions.contributionDays.reduce(
            (totalContribution, individualContribution, index, array) => {
              totalContribution += individualContribution.weekday;
              if (index === array.length - 1) {
                return totalContribution / array.length;
              } else {
                return totalContribution;
              }
            },
            0
          )
      );

    setAverageActivity(
      totalContribution.reduce(
        (totalContribution, individualContribution) =>
          totalContribution + individualContribution
      ) / totalContribution.length
    );
  }, []);

  useEffect(() => {
    setMonthsArray(initialMonthsArray);
  }, []);

  useEffect(() => {
    setMonthsArray((monthsArray) =>
      monthGenerator(
        dashboardDummy.data.user.contributionsCollection.contributionCalendar
          .weeks[0].contributionDays[0].date,
        monthsArray
      )
    );

    const extractArrayContribution =
      dashboardDummy.data.user.contributionsCollection.contributionCalendar.weeks.map(
        (contributions) =>
          contributions.contributionDays.map((individualContributions) => {
            return individualContributions.weekday;
          })
      );

    setMostActive(flattenArray(extractArrayContribution).sort().reverse()[0]);
  }, [monthGenerator]);

  return (
      <main>
        <div className="pt-[10vh] md:pt-[15vh]">
        <h1 className='text-zinc-700 dark:text-zinc-200'>Dashboard</h1>
        <p className='text-zinc-500 dark:text-zinc-400 mt-2'>
          Contains my personal information and tracking activity around my work,
          built with Next.js API routes deployed as serverless functions
        </p>
        </div>
        <div className="flex flex-col mt-7 gap-5">
          <section>
          <div className="flex flex-row items-center gap-2">
              <GithubIcon className="h-6 w-6 dark:fill-white"/>
            <h3 className='text-zinc-700 dark:text-zinc-200'>Github Contributions</h3>
            </div>
            <p className='text-zinc-500 dark:text-zinc-400 '>
              My Github contribution over the year
            </p>
            <div className='grid grid-cols-1 gap-2 py-2 sm:grid-cols-2 md:grid-cols-4'>
              <div className='flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800'>
                <span className='text-sm dark:text-zinc-400'>Total</span>
                <span className='text-2xl font-bold text-green-600'>
                  {
                    dashboardDummy.data.user.contributionsCollection
                      .contributionCalendar.totalContributions
                  }
                </span>
              </div>
              <div className='flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800'>
                <span className='text-sm dark:text-zinc-400'>This Week</span>
                <span className='text-2xl font-bold text-green-600'>
                  {dashboardDummy.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays.reduce(
                    (totalContribution, contribution) => {
                      return totalContribution + contribution.weekday;
                    },
                    0
                  )}
                </span>
              </div>
              <div className='flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800'>
                <span className='text-sm dark:text-zinc-400'>Most Active</span>
                <span className='text-2xl font-bold text-green-600'>
                  {mostActive}
                </span>
              </div>
              <div className='flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800'>
                <span className='text-sm dark:text-zinc-400'>
                  Average Activity
                </span>
                <span className='text-2xl font-bold text-green-600'>
                  {averageActivity.toFixed()}
                </span>
              </div>
            </div>
            <div className='relative flex flex-col'>
              <ul className='flex justify-end gap-[3px] overflow-hidden text-xs dark:text-zinc-400 md:justify-start'>
                {monthsArray.map((month, i) => (
                  <li
                    key={i}
                    className={clsxm([
                      (month === 'Apr' ||
                        month === 'Jul' ||
                        month === 'Oct' ||
                        month === 'Dec') &&
                        'w-[61.5px]',
                      (month === 'Jan' ||
                        month === 'Feb' ||
                        month === 'Mar' ||
                        month === 'May' ||
                        month === 'Jun' ||
                        month === 'Aug' ||
                        month === 'Sep' ||
                        month === 'Nov') &&
                        'w-[49.2px]',
                    ])}
                  >
                    {month}
                  </li>
                ))}
                <li className='w-[12.3px]'></li>
              </ul>

              <div className='flex justify-start gap-[3px] overflow-hidden'>
                {dashboardDummy.data.user.contributionsCollection.contributionCalendar.weeks.map(
                  (contributions, i) => (
                    <div key={i}>
                      {contributions.contributionDays.map(
                        (individualContributions, i) => (
                          <span
                            key={i}
                            className={clsxm(
                              'my-[2px] block h-[10px] w-[10px] rounded-sm',
                              [
                                individualContributions.color === '#ebedf0' &&
                                  'bg-gray-200 dark:bg-gray-800',
                                  individualContributions.color === '#9be9a8' &&
                                  'bg-green-200',
                                  individualContributions.color === '#40c463' &&
                                    'bg-green-400',
                                individualContributions.color === '#30a14e' &&
                                  'bg-green-600',
                                individualContributions.color === '#216e39' &&
                                  'bg-green-800',
                              ]
                            )}
                          />
                        )
                      )}
                    </div>
                  )
                )}
              </div>
              <div className="flex ">
                <div className="flex flex-row gap-2 items-center">
                  <span>Less</span>
                  <ul className="flex flex-row gap-1">
                    <li
                      className=
                        ' h-[10px] w-[10px] rounded-sm bg-green-200'
                    />
                    <li
                      className='h-[10px] w-[10px] rounded-sm bg-green-400'/>
                      <li
                      className='h-[10px] w-[10px] rounded-sm bg-green-600'/>
                      <li
                      className='h-[10px] w-[10px] rounded-sm bg-green-800'/>
                  </ul>
                  <span>More</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex flex-row items-center gap-2">
              <WakatimeIcon className="h-6 w-6 dark:fill-white"/>
            <h3 className='text-zinc-700 dark:text-zinc-200 '>Coding Activity</h3>
            </div>
           
            <p className='text-zinc-500 dark:text-zinc-400 '>
              Tracked by <Anchor href='#'>Wakatime</Anchor>
            </p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-2">
            <div className="flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800">
              <span>
                Most Productive Day
              </span>
              <span>
                9 hrs 26 mins
              </span>
            </div>
            <div className="flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800">
              <span>
                Daily Coding Average
              </span>
              <span className='text-xl font-semibold'>
                9 hrs 26 mins
              </span>
            </div>
            <div className="flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800">
              <span>
                Hours Spent on Coding Alltime
              </span>
              <span>
                9 hrs 26 mins
              </span>
            </div>
            <div className="flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800">
              <span>
                Last 7 Days
              </span>
              <span>
                9 hrs 26 mins
              </span>
            </div>

            <div className='flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800'>
                <span>Languages</span>
                <ul className="flex flex-col">
                              <li className='flex flex-row justify-between items-center gap-2'>
                                  <span className='w-24'>
                                    Typescript
                                  </span>
                                  <div className='relative flex h-3 flex-1 justify-center rounded-full bg-zinc-200 dark:bg-zinc-800'>
                                    <div className="bg-gradient-to-r from-amber-400 to-rose-600 absolute left-0 top-0 h-3 rounded-full px-3 w-[90%]" />
                                  </div>
                                  <span>
                                    80%
                                  </span>

                              </li>

                              <li className='flex flex-row justify-between items-center gap-2'>
                                  <span className='w-24'>
                                    C++
                                  </span>
                                  <div className='relative flex h-3 flex-1 justify-center rounded-full bg-zinc-200 dark:bg-zinc-800'>
                                    <div className="bg-gradient-to-r from-amber-400 to-rose-600 absolute left-0 top-0 h-3 rounded-full px-3 w-[90%]" />
                                  </div>
                                  <span>
                                    80%
                                  </span>

                              </li>

                              <li className='flex flex-row justify-between items-center gap-2'>
                                  <span className='w-24'>
                                    Golang
                                  </span>
                                  <div className='relative flex h-3 flex-1 justify-center rounded-full bg-zinc-200 dark:bg-zinc-800'>
                                    <div className="bg-gradient-to-r from-amber-400 to-rose-600 absolute left-0 top-0 h-3 rounded-full px-3 w-[90%]" />
                                  </div>
                                  <span>
                                    80%
                                  </span> 

                              </li>
                              <li className='flex flex-row justify-between items-center gap-2'>
                                  <span className='w-24'>
                                    Rust
                                  </span>
                                  <div className='relative flex h-3 flex-1 justify-center rounded-full bg-zinc-200 dark:bg-zinc-800'>
                                    <div className="bg-gradient-to-r from-amber-400 to-rose-600 absolute left-0 top-0 h-3 rounded-full px-3 w-[90%]" />
                                  </div>
                                  <span>
                                    80%
                                  </span>

                              </li>
                              <li className='flex flex-row justify-between items-center gap-2'>
                                  <span className='w-24'>
                                    Others
                                  </span>
                                  <div className='relative flex h-3 flex-1 justify-center rounded-full bg-zinc-200 dark:bg-zinc-800'>
                                    <div className="bg-gradient-to-r from-amber-400 to-rose-600 absolute left-0 top-0 h-3 rounded-full px-3 w-[90%]" />
                                  </div>
                                  <span>
                                    80%
                                  </span>

                              </li>
                </ul>

                
            </div>

            <div className='flex flex-col rounded-xl bg-zinc-100 py-2 px-4 shadow-md dark:bg-zinc-900 shadow-zinc-200 dark:shadow-zinc-800'>
                <span>Operating System</span>
                <ul className="flex flex-col">
                              <li className='flex flex-row justify-between items-center gap-2'>
                                  <p className='w-20'>
                                    Apple
                                  </p>
                                  <div className='relative flex h-3 flex-1 justify-center rounded-full bg-zinc-200 dark:bg-zinc-800'>
                                    <div className="bg-gradient-to-r from-amber-400 to-rose-600 absolute left-0 top-0 h-3 rounded-full px-3 w-[100%]" />
                                  </div>
                                  <span>
                                    100%
                                  </span>

                              </li>
                </ul>

                
            </div>

            </div>
            </section>
        </div>
        
      </main>
  );
}
