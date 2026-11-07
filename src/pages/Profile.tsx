import {
  LoyaltySection,
  OrdersSection,
  ProfileNavigation,
  UserCard,
  UserInfo,
  WishlistSection,
} from "@/components";

const Profile = () => {
  return (
    <main className="mx-auto mt-19 flex w-full max-w-[1600px] flex-col items-center gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
      <ProfileNavigation />
      <article className="w-full">
        <UserCard />
        <div className="my-5 grid w-full grid-cols-1 gap-5 min-[850px]:grid-cols-2">
          <UserInfo />
          <OrdersSection />
          <LoyaltySection />
          <WishlistSection />
        </div>
      </article>
    </main>
  );
};

export default Profile;
