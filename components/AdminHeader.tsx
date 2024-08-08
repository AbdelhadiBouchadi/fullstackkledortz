import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AdminHeader = () => {
  return (
    <div>
      <header className="admin-header mt-8 ">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/favicon.ico"
            height={80}
            width={80}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold text-dark-700">Admin Dashboard</p>
      </header>
    </div>
  );
};

export default AdminHeader;
