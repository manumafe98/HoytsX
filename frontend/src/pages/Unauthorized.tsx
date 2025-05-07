import { Layout } from "@/components/Layout";

export const Unauthorized = () => {
  return (
    <Layout showFooter={true}>
      <div className="flex items-center h-full justify-center my-auto min-h-full">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-primary mb-6">401</h1>
          <p className="text-2xl text-primary mb-2">Unauthorized</p>
          <p className="text-primary">
            We are sorry, but you are not authorized to access this page
          </p>
        </div>
      </div>
    </Layout>
  );
};
