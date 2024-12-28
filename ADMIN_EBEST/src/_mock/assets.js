import { faker } from '@faker-js/faker';
import useUserStore from '@/store/userStore';

import { BasicStatus, PermissionType } from '#/enum';
/**
 * Organization data mock
 */
export const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 1,
    children: [
      { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'South China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 2,
    children: [
      { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  parentId: '',
  label: 'sys.menu.dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'dashboard',
  order: 1,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927703',
      label: 'sys.menu.workbench',
      name: 'Workbench',
      type: PermissionType.MENU,
      route: 'workbench',
      component: '/dashboard/workbench/index.tsx',
    },
    {
      id: '9710971640510357',
      parentId: '9100714781927703',
      label: 'sys.menu.analysis',
      name: 'Analysis',
      type: PermissionType.MENU,
      route: 'analysis',
      component: '/dashboard/analysis/index.tsx',
    }
  ],
};
const MANAGEMENT_PERMISSION = {
  id: '0901673425580518',
  parentId: '',
  label: 'sys.menu.management',
  name: 'Management',
  icon: 'ic-management',
  type: PermissionType.CATALOGUE,
  route: 'management',
  order: 2,
  children: [
    // {
    //   id: '2781684678535711',
    //   parentId: '0901673425580518',
    //   label: 'sys.menu.user.index',
    //   name: 'User',
    //   type: PermissionType.CATALOGUE,
    //   route: 'user',
    //   children: [
    //     {
    //       id: '4754063958766648',
    //       parentId: '2781684678535711',
    //       label: 'sys.menu.user.profile',
    //       name: 'Profile',
    //       type: PermissionType.MENU,
    //       route: 'profile',
    //       component: '/management/user/profile/index.tsx',
    //     },
    //     {
    //       id: '2516598794787938',
    //       parentId: '2781684678535711',
    //       label: 'sys.menu.user.account',
    //       name: 'Account',
    //       type: PermissionType.MENU,
    //       route: 'account',
    //       component: '/management/user/account/index.tsx',
    //     },
    //   ],
    // },
    // {
    //   id: '0249937641030250',
    //   parentId: '0901673425580518',
    //   label: 'sys.menu.system.index',
    //   name: 'System',
    //   type: PermissionType.CATALOGUE,
    //   route: 'system',
    //   children: [
    //     {
    //       id: '1985890042972842',
    //       parentId: '0249937641030250',
    //       label: 'sys.menu.system.organization',
    //       name: 'Organization',
    //       type: PermissionType.MENU,
    //       route: 'organization',
    //       component: '/management/system/organization/index.tsx',
    //     },
    //     {
    //       id: '4359580910369984',
    //       parentId: '0249937641030250',
    //       label: 'sys.menu.system.permission',
    //       name: 'Permission',
    //       type: PermissionType.MENU,
    //       route: 'permission',
    //       component: '/management/system/permission/index.tsx',
    //     },
    //     {
    //       id: '1689241785490759',
    //       parentId: '0249937641030250',
    //       label: 'sys.menu.system.role',
    //       name: 'Role',
    //       type: PermissionType.MENU,
    //       route: 'role',
    //       component: '/management/system/role/index.tsx',
    //     },
    //     {
    //       id: '0157880245365433',
    //       parentId: '0249937641030250',
    //       label: 'sys.menu.system.user',
    //       name: 'User',
    //       type: PermissionType.MENU,
    //       route: 'user',
    //       component: '/management/system/user/index.tsx',
    //     },
    //     {
    //       id: '0157880245365434',
    //       parentId: '0249937641030250',
    //       label: 'sys.menu.system.user_detail',
    //       name: 'User Detail',
    //       type: PermissionType.MENU,
    //       route: 'user/:id',
    //       component: '/management/system/user/detail.tsx',
    //       hide: true,
    //     },
    //   ],
    // },
    {
      id: '2781684678535711',
      parentId: '0901673425580518',
      label: 'sys.menu.student.index',
      name: 'Student',
      type: PermissionType.CATALOGUE,
      route: 'student',
      children: [
        {
          id: '4754063958766648',
          parentId: '2781684678535711',
          label: 'sys.menu.student.listStudents',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'listStudents',
          component: '/management/student/listStudent/index.tsx'
        },
        {
          id: '4754063958766649',
          parentId: '2781684678535711',
          label: 'sys.menu.student.memberPlaces',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'memberPlaces',
          component: '/management/student/memberPlaces/index.tsx',
        },
        {
          id: '0157880245365434',
          parentId: '0249937641030250',
          label: 'sys.menu.system.user_detail',
          name: 'Chi tiết học viên',
          type: PermissionType.MENU,
          route: 'listStudents/:id',
          component: '/management/student/listStudent/profileStudent/index.tsx',
          hide: true,
        },
      ],
    },
    {
      id: '2781684678535712',
      parentId: '0901673425580518',
      label: 'sys.menu.staff.index',
      name: 'Staff',
      type: PermissionType.CATALOGUE,
      route: 'staff',
      children: [
        {
          id: '4754063958766746',
          parentId: '2781684678535712',
          label: 'sys.menu.staff.listStaff',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'listStaff',
          component: '/management/staff/listStaff/index.tsx',
        },
        {
          id: '4754063958762346',
          parentId: '2781684678535712',
          label: 'sys.menu.staff.listStaff',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'listStaff/:id',
          component: '/management/staff/listStaff/profileStaff/index.tsx',
          hide: true,
        },
        // {
        //   id: '4754063958766425',
        //   parentId: '2781684678535712',
        //   label: 'sys.menu.staff.sChedule',
        //   // name: 'Profile',
        //   type: PermissionType.MENU,
        //   route: 'schedule',
        //   component: '/management/staff/schedule/index.tsx',
        // },
        {
          id: '4754063958766743',
          parentId: '2781684678535712',
          label: 'sys.menu.staff.leave',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'leave',
          component: '/management/staff/leave/index.tsx',
        },
        {
          id: '4754063958766963',
          parentId: '2781684678535712',
          label: 'sys.menu.staff.salary',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'salary',
          component: '/management/teacher/salary/index.tsx',
        },
      ],
    },
    {
      id: '2781684678553427',
      parentId: '0901673425580518',
      label: 'sys.menu.learnProgram.index',
      name: 'LearnProgram',
      type: PermissionType.CATALOGUE,
      route: 'learnProgram',
      children: [
        {
          id: '2781684958766746',
          parentId: '2781684678553427',
          label: 'sys.menu.learnProgram.course',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'course',
          component: '/management/program/course/index.tsx',
        },
        {
					id: "0157880245365434",
					parentId: "2781684678553427",
					label: "sys.menu.learnProgram.course",
					name: "User Detail",
					type: PermissionType.MENU,
					route: "course/:id",
					component: "/management/program/course/class/index.tsx",
					hide: true,
				},
        {
					id: "0157880245365434",
					parentId: "2781684678553427",
					label: "sys.menu.learnProgram.course",
					name: "User Detail",
					type: PermissionType.MENU,
					route: "course/:id/:classId",
					component: "/management/program/course/profileClass/index.tsx",
					hide: true,
				},
        {
          id: '2781684958766425',
          parentId: '2781684678553427',
          label: 'sys.menu.learnProgram.material',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'material',
          component: '/management/program/material/index.tsx',
        },
        {
          id: '2781684958766743',
          parentId: '2781684678553427',
          label: 'sys.menu.learnProgram.exam',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'exam',
          component: '/management/program/exam/index.tsx',
        },
        {
          id: '2781684958766963',
          parentId: '2781684678553427',
          label: 'sys.menu.learnProgram.question',
          // name: 'Profile',
          type: PermissionType.MENU,
          route: 'question',
          component: '/management/program/question/index.tsx',
        },
      ],
    },
  ],
};
const MENU_LEVEL_PERMISSION = {
  id: '0194818428516575',
  parentId: '',
  label: 'sys.menu.menulevel.index',
  name: 'Menu Level',
  icon: 'ic-menulevel',
  type: PermissionType.CATALOGUE,
  route: 'menu-level',
  order: 5,
  children: [
    {
      id: '0144431332471389',
      parentId: '0194818428516575',
      label: 'sys.menu.menulevel.1a',
      name: 'Menu Level 1a',
      type: PermissionType.MENU,
      route: 'menu-level-1a',
      component: '/menu-level/menu-level-1a/index.tsx',
    },
    {
      id: '7572529636800586',
      parentId: '0194818428516575',
      label: 'sys.menu.menulevel.1b.index',
      name: 'Menu Level 1b',
      type: PermissionType.CATALOGUE,
      route: 'menu-level-1b',
      children: [
        {
          id: '3653745576583237',
          parentId: '7572529636800586',
          label: 'sys.menu.menulevel.1b.2a',
          name: 'Menu Level 2a',
          type: PermissionType.MENU,
          route: 'menu-level-2a',
          component: '/menu-level/menu-level-1b/menu-level-2a/index.tsx',
        },
        {
          id: '4873136353891364',
          parentId: '7572529636800586',
          label: 'sys.menu.menulevel.1b.2b.index',
          name: 'Menu Level 2b',
          type: PermissionType.CATALOGUE,
          route: 'menu-level-2b',
          children: [
            {
              id: '4233029726998055',
              parentId: '4873136353891364',
              label: 'sys.menu.menulevel.1b.2b.3a',
              name: 'Menu Level 3a',
              type: PermissionType.MENU,
              route: 'menu-level-3a',
              component: '/menu-level/menu-level-1b/menu-level-2b/menu-level-3a/index.tsx',
            },
            {
              id: '3298034742548454',
              parentId: '4873136353891364',
              label: 'sys.menu.menulevel.1b.2b.3b',
              name: 'Menu Level 3b',
              type: PermissionType.MENU,
              route: 'menu-level-3b',
              component: '/menu-level/menu-level-1b/menu-level-2b/menu-level-3b/index.tsx',
            },
          ],
        },
      ],
    },
  ],
};
const OTHERS_PERMISSION = [
  {
    id: '3981225257359246',
    parentId: '',
    label: 'sys.menu.calendar',
    name: 'Calendar',
    icon: 'solar:calendar-bold-duotone',
    type: PermissionType.MENU,
    route: 'calendar',
    component: '/sys/others/calendar/index.tsx',
  },
  {
    id: '3513985683886393',
    parentId: '',
    label: 'sys.menu.kanban',
    name: 'kanban',
    icon: 'solar:clipboard-bold-duotone',
    type: PermissionType.MENU,
    route: 'kanban',
    component: '/sys/others/kanban/index.tsx',
  },
];

export const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  MANAGEMENT_PERMISSION,
  ...OTHERS_PERMISSION,
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: BasicStatus.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: PERMISSION_LIST,
};
const TEST_ROLE = {
  id: '9931665660771476',
  name: 'Test',
  label: 'test',
  status: BasicStatus.ENABLE,
  order: 2,
  desc: 'test',
  permission: [DASHBOARD_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: 'b34719e1-ce46-457e-9575-99505ecee828',
  username: 'admin',
  email: faker.internet.email(),
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: 'demo1234',
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
  id: 'efaa20ea-4dc5-47ee-a200-8a899be29494',
  username: 'test',
  password: 'demo1234',
  email: faker.internet.email(),
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  role: TEST_ROLE,
  permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];

// * Hot update, updating user permissions, only effective in the development environment
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (!newModule) return;

    const { DEFAULT_USER, TEST_USER, PERMISSION_LIST } = newModule;

    // 使用 getState() 和 setState() 直接操作 store
    const {
      userInfo,
      actions: { setUserInfo },
    } = useUserStore.getState();

    if (!userInfo?.username) return;

    const newUserInfo = userInfo.username === DEFAULT_USER.username ? DEFAULT_USER : TEST_USER;

    // 使用 store.actions 更新状态
    setUserInfo(newUserInfo);

    console.log('[HMR] User permissions updated:', {
      username: newUserInfo.username,
      permissions: newUserInfo.permissions,
    });
  });
}

export const DetaiLQuestion = [
  // Part 1
  {
    key: "1",
    part: "Part 1",
    questionType: "Tranh tả người",
    count: 2,
    library: 12,
    percentage: "33%",
  },
  {
    key: "2",
    part: "Part 1",
    questionType: "Tranh tả vật",
    count: 2,
    percentage: "33%",
  },
  {
    key: "3",
    part: "Part 1",
    questionType: "Tranh tả cả người và vật",
    count: 2,
    percentage: "33%",
  },

  // Part 2
  {
    key: "4",
    part: "Part 2",
    questionType: "Câu hỏi WHAT",
    count: 4,
    percentage: "16%",
  },
  {
    key: "5",
    part: "Part 2",
    questionType: "Câu hỏi WHO",
    count: 3,
    percentage: "12%",
  },
  {
    key: "6",
    part: "Part 2",
    questionType: "Câu hỏi WHERE",
    count: 3,
    percentage: "12%",
  },
  {
    key: "7",
    part: "Part 2",
    questionType: "Câu hỏi WHEN",
    count: 2,
    percentage: "8%",
  },
  {
    key: "8",
    part: "Part 2",
    questionType: "Câu hỏi HOW",
    count: 2,
    percentage: "8%",
  },
  {
    key: "9",
    part: "Part 2",
    questionType: "Câu hỏi WHY",
    count: 2,
    percentage: "8%",
  },
  {
    key: "10",
    part: "Part 2",
    questionType: "Câu hỏi YES/NO",
    count: 3,
    percentage: "12%",
  },
  {
    key: "11",
    part: "Part 2",
    questionType: "Câu hỏi đuôi",
    count: 2,
    percentage: "8%",
  },
  {
    key: "12",
    part: "Part 2",
    questionType: "Câu hỏi lựa chọn",
    count: 2,
    percentage: "8%",
  },
  {
    key: "13",
    part: "Part 2",
    questionType: "Câu yêu cầu, đề nghị",
    count: 2,
    percentage: "8%",
  },

  // Part 3
  {
    key: "14",
    part: "Part 3",
    questionType: "Câu hỏi về chủ đề, mục đích",
    count: 6,
    percentage: "15%",
  },
  {
    key: "15",
    part: "Part 3",
    questionType: "Câu hỏi về danh tính người nói",
    count: 4,
    percentage: "10%",
  },
  {
    key: "16",
    part: "Part 3",
    questionType: "Câu hỏi về chi tiết cuộc hội thoại",
    count: 5,
    percentage: "13%",
  },
  {
    key: "17",
    part: "Part 3",
    questionType: "Câu hỏi về hành động tương lai",
    count: 4,
    percentage: "10%",
  },
  {
    key: "18",
    part: "Part 3",
    questionType: "Câu hỏi kết hợp bảng biểu",
    count: 4,
    percentage: "10%",
  },
  {
    key: "19",
    part: "Part 3",
    questionType: "Câu hỏi về hàm ý câu nói",
    count: 4,
    percentage: "10%",
  },
  {
    key: "20",
    part: "Part 3",
    questionType: "Chủ đề: Company - General Office Work",
    count: 2,
    percentage: "5%",
  },
  {
    key: "21",
    part: "Part 3",
    questionType: "Chủ đề: Company - Business, Marketing",
    count: 2,
    percentage: "5%",
  },
  {
    key: "22",
    part: "Part 3",
    questionType: "Chủ đề: Company - Event, Project",
    count: 2,
    percentage: "5%",
  },
  {
    key: "23",
    part: "Part 3",
    questionType: "Chủ đề: Company - Facility",
    count: 2,
    percentage: "5%",
  },
  {
    key: "24",
    part: "Part 3",
    questionType: "Chủ đề: Shopping, Service",
    count: 2,
    percentage: "5%",
  },
  {
    key: "25",
    part: "Part 3",
    questionType: "Chủ đề: Order, delivery",
    count: 2,
    percentage: "5%",
  },
  {
    key: "26",
    part: "Part 3",
    questionType: "Chủ đề: Transportation",
    count: 2,
    percentage: "5%",
  },
  {
    key: "27",
    part: "Part 3",
    questionType: "Chủ đề: Housing",
    count: 2,
    percentage: "5%",
  },
  {
    key: "28",
    part: "Part 3",
    questionType: "Câu hỏi về địa điểm hội thoại",
    count: 2,
    percentage: "5%",
  },
  {
    key: "29",
    part: "Part 3",
    questionType: "Câu hỏi về yêu cầu, gợi ý",
    count: 2,
    percentage: "5%",
  },

  // Part 4
  {
    key: "30",
    part: "Part 4",
    questionType: "Câu hỏi về chủ đề, mục đích",
    count: 5,
    percentage: "17%",
  },
  {
    key: "31",
    part: "Part 4",
    questionType: "Câu hỏi về danh tính, địa điểm",
    count: 4,
    percentage: "13%",
  },
  {
    key: "32",
    part: "Part 4",
    questionType: "Câu hỏi về chi tiết",
    count: 6,
    percentage: "20%",
  },
  {
    key: "33",
    part: "Part 4",
    questionType: "Câu hỏi về hành động tương lai",
    count: 4,
    percentage: "13%",
  },
  {
    key: "34",
    part: "Part 4",
    questionType: "Câu hỏi kết hợp bảng biểu",
    count: 3,
    percentage: "10%",
  },
  {
    key: "35",
    part: "Part 4",
    questionType: "Câu hỏi về hàm ý câu nói",
    count: 4,
    percentage: "13%",
  },
  {
    key: "36",
    part: "Part 4",
    questionType: "Dạng bài: Telephone message - Tin nhắn thoại",
    count: 2,
    percentage: "7%",
  },
  {
    key: "37",
    part: "Part 4",
    questionType: "Dạng bài: Advertisement - Quảng cáo",
    count: 2,
    percentage: "7%",
  },
  {
    key: "38",
    part: "Part 4",
    questionType: "Dạng bài: Announcement - Thông báo",
    count: 2,
    percentage: "7%",
  },
  {
    key: "39",
    part: "Part 4",
    questionType: "Dạng bài: Talk - Bài phát biểu, diễn văn",
    count: 2,
    percentage: "7%",
  },
  {
    key: "40",
    part: "Part 4",
    questionType: "Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp",
    count: 2,
    percentage: "7%",
  },
  {
    key: "41",
    part: "Part 4",
    questionType: "Câu hỏi yêu cầu, gợi ý",
    count: 2,
    percentage: "7%",
  },

  // Part 5
  {
    key: "42",
    part: "Part 5",
    questionType: "Câu hỏi từ loại",
    count: 10,
    percentage: "33%",
  },
  {
    key: "43",
    part: "Part 5",
    questionType: "Câu hỏi ngữ pháp",
    count: 10,
    percentage: "33%",
  },
  {
    key: "44",
    part: "Part 5",
    questionType: "Câu hỏi từ vựng",
    count: 10,
    percentage: "33%",
  },

  // Part 6
  {
    key: "45",
    part: "Part 6",
    questionType: "Câu hỏi từ loại",
    count: 3,
    percentage: "19%",
  },
  {
    key: "46",
    part: "Part 6",
    questionType: "Câu hỏi ngữ pháp",
    count: 4,
    percentage: "25%",
  },
  {
    key: "47",
    part: "Part 6",
    questionType: "Câu hỏi từ vựng",
    count: 4,
    percentage: "25%",
  },
  {
    key: "48",
    part: "Part 6",
    questionType: "Câu hỏi điền câu vào đoạn văn",
    count: 5,
    percentage: "31%",
  },

  // Part 7
  {
    key: "49",
    part: "Part 7",
    questionType: "Câu hỏi tìm thông tin",
    count: 10,
    percentage: "18%",
  },
  {
    key: "50",
    part: "Part 7",
    questionType: "Câu hỏi tìm chi tiết sai",
    count: 6,
    percentage: "11%",
  },
  {
    key: "51",
    part: "Part 7",
    questionType: "Câu hỏi về chủ đề, mục đích",
    count: 8,
    percentage: "15%",
  },
  {
    key: "52",
    part: "Part 7",
    questionType: "Câu hỏi suy luận",
    count: 8,
    percentage: "15%",
  },
  {
    key: "53",
    part: "Part 7",
    questionType: "Câu hỏi điền câu",
    count: 6,
    percentage: "11%",
  },
  {
    key: "54",
    part: "Part 7",
    questionType: "Các dạng bài (Email, Article, etc.)",
    count: 16,
    percentage: "30%",
  },
];