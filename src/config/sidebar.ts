import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { RouteAdminCctv, RouteAdminCctvCategory, RouteCctvCategories, RouteLogin } from './routing';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Auth } from '@/core/auth';
import DvrIcon from '@mui/icons-material/Dvr';
import { PeopleOutline } from '@mui/icons-material';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';

export const SideBar = () => {

  const auth = Auth().get();

  const HomePage = {
    icon: DashboardTwoToneIcon,
    label: "Dashboard",
    link: "/",
    child: []
  }

  const ListCctv = {
    icon: DvrIcon,
    label: "CCTV SatPel",
    link: null,
    child: [
      {
        icon: PhotoCameraFrontIcon,
        label: "Terminal",
        link: RouteCctvCategories(1)
      },
      {
        icon: PhotoCameraFrontIcon,
        label: "UPPBK",
        link: RouteCctvCategories(2)
      },
      {
        icon: PhotoCameraFrontIcon,
        label: "Pelabuhan",
        link: RouteCctvCategories(3)
      }
    ]
  }

  const BusPage = {
    icon: DirectionsBusFilledIcon,
    label: "Jadwal Bus",
    isNewTab: true,
    link: "https://databasebptdjabar.my.canva.site/jadwal-keberangkatan",
    newTab: true,
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
    ListCctv,
    BusPage,
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