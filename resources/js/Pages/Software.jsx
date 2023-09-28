import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Typography, Link, Button } from "@mui/material";

export default function Manage({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-gray-800 leading-tight">
          <p className="font-semibold text-xl">Software information</p>
        </h2>
      }
    >
      <Head title="Software information" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg" style={{padding: "24px"}}>
                <Typography variant="h5" component="h5" style={{marginBottom: "16px", marginTop: "16px"}}>
                    Software information
                </Typography>
                <p>
                    NextCaligo is an open source, free IaaS management software that specializes in VPS management. Its goal is to bring about a 
                    change in the web hosting market by using modern technologies, 
                    since most hosting companies today use the same software - often it is almost impossible to tell the difference between them.
                </p>
                <Typography variant="h5" component="h5" style={{marginBottom: "16px", marginTop: "16px"}}>
                    Documentation & pricing
                </Typography>
                <p>
                    You are currently using the SysAdmin edition of NextCaligo. This is a system optimized for private purposes, small companies, and few VPS. <br />
                    In the Webhost version, the permission system, two-step login, and teamwork functions are available, and it also 
                    offers more options in the field of VPS management and virtualization (for example, more network settings and high availability functions).
                </p><br />
                <p>
                    You can find the software documentation and the technologies used on our website.
                </p>
                <Typography variant="h5" component="h5" style={{marginBottom: "16px", marginTop: "16px"}}>
                    History
                </Typography>
                <p>
                    NextCaligo software was created by Erik Stütz (Hungary). 
                    It originally started as a thesis for software development training in 2022, initially as a remote Linux server manager. 
                    Later, I saw an old goal in it: a new DevOPS platform on which containers/VPS services can be managed professionally, and which is much cheaper than other alternatives, may be able to shake up the web hosting market and those interested in it. It is not necessary to get stuck with the technologies and software that most hosting companies use today.
                </p>
                <Link style={{marginBottom: "16px", marginTop: "16px"}} href="http://nextcaligo.cloud">Visit project website</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}