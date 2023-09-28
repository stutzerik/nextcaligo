import { useEffect } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Alert, TextField } from "@mui/material";

export default function Dashboard({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Add account
        </h2>
      }
    >
      <Head title="Add account" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 col-sm-6">
              <form onSubmit={submit}>
                <div className="mt-4 py-3">
                  <Alert severity="warning">
                    Whoever you add to the system also has access to everything.
                  </Alert>
                </div>
                <div>
                  <TextField
                    id="name"
                    name="name"
                    value={data.name}
                    variant="filled"
                    autoComplete="name"
                    fullWidth
                    label="Name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                  <TextField
                    id="email"
                    type="email"
                    name="email"
                    fullWidth
                    label="Email address"
                    value={data.email}
                    variant="filled"
                    autoComplete="username"
                    onChange={(e) => setData("email", e.target.value)}
                    required
                  />

                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                  <TextField
                    id="password"
                    type="password"
                    name="password"
                    fullWidth
                    value={data.password}
                    variant="filled"
                    autoComplete="new-password"
                    label="Password"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                  <TextField
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    variant="filled"
                    label="Confirm password"
                    fullWidth
                    autoComplete="new-password"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    required
                  />

                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>

                <div className="mt-4">
                  <PrimaryButton
                    style={{ marginTop: "24px !important" }}
                    className="ml-4"
                    disabled={processing}
                  >
                    Add account
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}