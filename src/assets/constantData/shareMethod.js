import CallIcon from '@/assets/images/share/call.svg';
import LinkIcon from '@/assets/images/share/link.svg';
import UserGroupIcon from '@/assets/images/share/user-group.svg';

const ShareMethod = [
    {
        id: 'phone',
        label: 'Phone Number',
        description: 'Secure OTP - based access',
        icon: CallIcon,
    },
    {
        id: 'link',
        label: 'Secure Link',
        description: 'Time based- web link',
        icon: LinkIcon,
    },
    {
        id: 'group',
        label: 'Group Access',
        description: 'Grant access to family member',
        icon: UserGroupIcon,
    },
];
export default ShareMethod;
