import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import LocalLaundryServiceTwoToneIcon from '@mui/icons-material/LocalLaundryServiceTwoTone';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {  } from './routing';
import { Auth } from '@/core/auth';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

export const SideBar = () => {

  const auth = Auth().get();

  const HomePage = {
    icon: DashboardTwoToneIcon,
    label: "Dashboard",
    link: "/account",
    child: []
  }

  // const OutletPage = {
  //   icon: StorefrontTwoToneIcon,
  //   label: "Outlet",
  //   link: null,
  //   child: [
  //     {
  //       icon: AddBusinessTwoToneIcon,
  //       label: "Daftar Outlet",
  //       link: RouteOutlet()
  //     },
  //     {
  //       icon: LocalLaundryServiceTwoToneIcon,
  //       label: "Daftar Mesin",
  //       link: RouteMachine()
  //     }
  //   ]
  // };

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

  // const MerchantManagement = {
  //   icon: AccountBalanceWalletIcon,
  //   label: "Merchant Management",
  //   link: RouteMerchantManagement(),
  //   child: []
  // }

  return [
    HomePage,
    null,
    // OutletPage,
    // TransactionPage,
    // PointPage,
    // UserManagement,
    // ActivityLogPage

    // auth?.data?.level == "superadmin" ? UserManagement : null,
    // auth?.data?.level == "superadmin" ? MerchantManagement : null,
    // auth?.data?.level == "superadmin" ? ActivityLogPage : null
  ]
}