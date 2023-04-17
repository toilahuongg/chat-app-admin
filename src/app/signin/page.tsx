import LoginForm from '@src/features/Auth/LoginForm';

export const metadata = {
  title: 'Login Account',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex-center flex-col">
      <section className="flex-center bg-white px-4 py-8 dark:bg-gray-800 min-h-screen min-w-full sm:min-h-0 sm:min-w-0 sm:w-96 sm:rounded-lg">
        <div className="wrapper flex-1">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
