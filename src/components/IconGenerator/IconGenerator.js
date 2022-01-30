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
import {Search} from '../../../assets/svgs/search';
import {Location} from '../../../assets/svgs/location';

const components = {
  logo: LogoSVG,
  check: CheckSVG,
  arrowRight: ArrowRightSVG,
  close: CloseSVG,
  ChevronRight,
  error: ErrorSVG,
  notification: Notification,
  add: Add,
  calendar: CalendarSVG,
  cancel: CancelSVG,
  arrowLeft: ArrowLeftSVG,
  logout: Logout,
  off: Off,
  on: On,
  ChevronLeft,
  upload: Upload,
  smiley: Smiley,
  user: User,
  download: Download,
  clear: Clear,
  lock: Lock,
  doubleArrowBack: DoubleArrowBack,
  complete: Complete,
  info: Info,
  share: Share,
  gen: Gen,
  nonGen: NonGen,
  avatar: Avatar,
  faceId: FaceId,
  fingerprint: Fingerprint,
  search: Search,
  location: Location,
};

export const IconGen = props => {
  const TagName = components[props.tag];

  if (TagName) {
    return <TagName {...props} />;
  } else {
    return null;
  }
};
