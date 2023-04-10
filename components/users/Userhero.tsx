import Image from 'next/image';

import useUser from '@/hooks/useUser';

import Avatar from "../Avatar";

interface UserHeroProps { 
    userId: string;
}

const Userhero: React.FC<UserHeroProps> = ({ userId }) => {
    const { data: fetchedUser } = useUser(userId);

  return (
    <div>
        <div className="bg-neutral-700 h-44 relative">
            {fetchedUser?.coverImage && (
                <Image 
                src={fetchedUser.coverImage} 
                fill
                alt="cover image"
                style={{ objectFit: 'cover'}}
                />
            )}
            <div className="absolute -bottom-16 lef-4">
                <Avatar
                userId={userId}
                isLarge
                hasBorder
                />
            </div>
        </div>
    </div>
  )
}

export default Userhero