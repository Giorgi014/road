import {
  OrdersSection,
  ProfileNavigation,
  UserCard,
  UserInfo,
} from "@/components";

const Profile = () => {
  return (
    <main className="mx-auto mt-19 flex w-full max-w-[1600px] flex-col items-center gap-5 p-5 md:flex-row md:items-start md:justify-between">
      <ProfileNavigation />
      <article className="w-full">
        <UserCard />
        <div className="w-full flex justify-between items-start gap-5 my-5">
          <UserInfo />
          <OrdersSection />
        </div>
      </article>
    </main>
  );
};

export default Profile;
