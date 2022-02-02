import React from 'react';
import {Add} from '../../../assets/svgs/add';
import {Lock} from '../../../assets/svgs/lock';
import {ArrowLeftSVG} from '../../../assets/svgs/arrowLeft';
import {ArrowRightSVG} from '../../../assets/svgs/arrowRight';
import {CalendarSVG} from '../../../assets/svgs/calendar';
import {CancelSVG} from '../../../assets/svgs/cancel';
import {CheckSVG} from '../../../assets/svgs/check';
import {ChevronLeft} from '../../../assets/svgs/chevronLeft';
import {ChevronRight} from '../../../assets/svgs/chevronRight';
import {Clear} from '../../../assets/svgs/clear';
import {CloseSVG} from '../../../assets/svgs/close';
import {Download} from '../../../assets/svgs/download';
import {ErrorSVG} from '../../../assets/svgs/error';
import {LogoSVG} from '../../../assets/svgs/logo';
import {Logout} from '../../../assets/svgs/logout';
import {Notification} from '../../../assets/svgs/notification';
import {Off} from '../../../assets/svgs/off';
import {On} from '../../../assets/svgs/on';
import {Smiley} from '../../../assets/svgs/smiley';
import {Upload} from '../../../assets/svgs/upload';
import {User} from '../../../assets/svgs/user';
import {DoubleArrowBack} from '../../../assets/svgs/doubleArrowBack';
import {Complete} from '../../../assets/svgs/complete';
import {Info} from '../../../assets/svgs/info';
import {Share} from '../../../assets/svgs/share';
import {Avatar, Gen, NonGen} from '../../../assets/svgs/gen';
import {FaceId} from '../../../assets/svgs/faceId';
import {Fingerprint} from '../../../assets/svgs/fingerprint';
import {Home} from '../../../assets/svgs/home';
import {Activity} from '../../../assets/svgs/activity';
import {AddMoney} from '../../../assets/svgs/addMoney';
import {Accounts} from '../../../assets/svgs/accounts';
import {Profile} from '../../../assets/svgs/profile';
import {Transfer} from '../../../assets/svgs/transfer';
import {Request} from '../../../assets/svgs/request';
import {Beneficiaries} from '../../../assets/svgs/beneficiaries';
import {Debit} from '../../../assets/svgs/debit';
import {Credit} from '../../../assets/svgs/credit';

const components = {
  activity: Activity,
  accounts: Accounts,
  add: Add,
  addMoney: AddMoney,
  arrowLeft: ArrowLeftSVG,
  arrowRight: ArrowRightSVG,
  avatar: Avatar,
  beneficiary: Beneficiaries,
  cancel: CancelSVG,
  calendar: CalendarSVG,
  check: CheckSVG,
  ChevronLeft,
  ChevronRight,
  clear: Clear,
  close: CloseSVG,
  complete: Complete,
  credit: Credit,
  debit: Debit,
  doubleArrowBack: DoubleArrowBack,
  download: Download,
  error: ErrorSVG,
  faceId: FaceId,
  fingerprint: Fingerprint,
  gen: Gen,
  home: Home,
  info: Info,
  logo: LogoSVG,
  lock: Lock,
  logout: Logout,
  nonGen: NonGen,
  notification: Notification,
  off: Off,
  on: On,
  profile: Profile,
  request: Request,
  share: Share,
  smiley: Smiley,
  transfer: Transfer,
  upload: Upload,
  user: User,
};

export const IconGen = props => {
  const TagName = components[props.tag];

  if (TagName) {
    return <TagName {...props} />;
  } else {
    return null;
  }
};
