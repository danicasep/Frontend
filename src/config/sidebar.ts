import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { RouteAdminCctv, RouteAdminCctvCategory, RouteLogin } from './routing';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Auth } from '@/core/auth';
import DvrIcon from '@mui/icons-material/Dvr';
import { PeopleOutline } from '@mui/icons-material';

export const SideBar = () => {

  const auth = Auth().get();

  const HomePage = {
    icon: DashboardTwoToneIcon,
    label: "Dashboard",
    link: "/",
    child: []
  }

  const CctvPage = {
    icon: OndemandVideoIcon,
    label: "CCTV",
    link: null,
    child: [
      {
        icon: DvrIcon,
        label: "Daftar Kategori CCTV",
        link: RouteAdminCctvCategory()
      },
      {
        icon: LiveTvIcon,
        label: "Daftar CCTV",
        link: RouteAdminCctv()
      }
    ]
  };

  // const TransactionPage = {
  //   icon: AssignmentTwoToneIcon,
  //   label: "Transaksi",
  //   link: RouteTransaction(),
  //   child: []
  // }

  // const PointPage = {
  //   icon: AccountBalanceWalletTwoToneIcon,
  //   label: "Saldo",
  //   link: RoutePoint(),
  //   child: []
  // }

  // const ActivityLogPage = {
  //   icon: EditNoteIcon,
  //   label: "Log",
  //   link: RouteLog(),
  //   child: []
  // }

  // const UserManagement = {
  //   icon: SupervisedUserCircleIcon,
  //   label: "User Management",
  //   link: RouteUserManagment(),
  //   child: []
  // }

  const Login = {
    icon: PeopleOutline,
    label: "Login",
    link: RouteLogin(),
    child: []
  }

  return [
    HomePage,
    auth?.data ? null : Login,
    // OutletPage,
    // TransactionPage,
    // PointPage,
    // UserManagement,
    // ActivityLogPage

    auth?.data ? CctvPage : null,
    // auth?.data?.level == "superadmin" ? MerchantManagement : null,
    // auth?.data?.level == "superadmin" ? ActivityLogPage : null
  ]
}