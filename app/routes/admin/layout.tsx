import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { requireAuth } from '~/services/auth/auth_utils.server'
import type { Route } from './+types/layout'
import { signOut } from '~/services/auth/auth_client'
import { is } from 'drizzle-orm'

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon, end: true },
  // { name: 'Team', to: '/admin/team', icon: UsersIcon, current: false },
  { name: 'Programs', to: '/admin/programs', icon: FolderIcon, end: false },
  { name: 'Events', to: '/admin/events', icon: CalendarIcon, end: false },
  // { name: 'Documents', to: '/admin/documents', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', to: '/admin/reports', icon: ChartPieIcon, current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', to: '#', initial: 'H', end: false },
  { id: 2, name: 'Tailwind Labs', to: '#', initial: 'T', end: false },
  { id: 3, name: 'Workcation', to: '#', initial: 'W', end: false },
]


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request })

  return { user }

}




export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = loaderData
  const navigate = useNavigate()

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login"); // redirect to login page
        },
      },
    });
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="relative flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="relative flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              end={item.end}
                              className={({ isActive }) =>
                                clsx(
                                  isActive
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                )}
                            >
                              {({ isActive }) => (
                                <>
                                  <item.icon
                                    aria-hidden="true"
                                    className={clsx(
                                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}
                                </>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <NavLink
                              to={team.to}
                              end={team.end}
                              className={({ isActive }) => clsx(
                                isActive
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <span
                                className={clsx(
                                  team.end
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="-mx-6 mt-auto">
                      <ul className="flex flex-col gap-y-3">
                        <li className='px-1'>
                          <button
                            className="w-full flex items-center justify-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm/6 font-semibold text-red-700 hover:bg-red-100 transition-colors border border-red-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                            type="button"
                            title="Sign out"
                            onClick={logout}
                          >
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} aria-hidden="true">
                              <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1' />
                            </svg>
                            Sign out
                          </button>
                        </li>
                        <li>

                          <p
                            className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                          >
                            {
                              user?.image ?
                                <img
                                  alt=""
                                  src={user.image}
                                  className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
                                />
                                :
                                <UserIcon className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5" />
                            }
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">{user?.name}</span>
                          </p>
                        </li>

                      </ul>

                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className={({ isActive }) => clsx(
                                isActive
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              {({ isActive }) => (
                                <>
                                  <item.icon
                                    aria-hidden="true"
                                    className={clsx(
                                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}
                                </>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <NavLink
                              to={team.to}
                              className={({ isActive }) => clsx(
                                team.end
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <span
                                className={clsx(
                                  team.end
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <ul className="flex flex-col gap-y-3">
                    <li className='px-1'>
                      <button
                        className="w-full flex items-center justify-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm/6 font-semibold text-red-700 hover:bg-red-100 transition-colors border border-red-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                        type="button"
                        title="Sign out"
                        onClick={logout}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1' />
                        </svg>
                        Sign out
                      </button>
                    </li>
                    <li>

                      <p
                        className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {
                          user?.image ?
                            <img
                              alt=""
                              src={user.image}
                              className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
                            />
                            :
                            <UserIcon className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5" />
                        }
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">{user?.name}</span>
                      </p>
                    </li>

                  </ul>

                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">
            Dashboard
          </div>
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="relative flex items-center">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              {
                user.image ?
                  <img
                    alt=""
                    src={user.image}
                    className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
                  />
                  :
                  <UserIcon className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5" />
              }
              <span className="hidden lg:flex lg:items-center">
                <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                  {user?.name ?? "User"}
                </span>
                <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <MenuItem>
                <button
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                >
                  Logout
                </button>
              </MenuItem>

            </MenuItems>
          </Menu>
        </div>
        <main className="py-10 lg:pl-72">
          <Outlet />
        </main>
      </div>
    </>
  )
}
