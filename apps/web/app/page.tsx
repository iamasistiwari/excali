import { ArrowRight, Pencil, Users, Share2, PencilLine} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <PencilLine className="text-primary h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Excalidraw Clone</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/signin`}
                className="text-md inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:opacity-75 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign In
              </Link>
              <Link
                href={`/signup`}
                className="text-md inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#9f5ebd] px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-75 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden text-[#efefef]">
        <div className="from-primary/5 to-primary/10 absolute inset-0 z-0 bg-gradient-to-br" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-primary mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              Collaborative Whiteboarding
              <br />
              <span className="text-primary/80">Made Simple</span>
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
              Create, collaborate, and share beautiful hand-drawn diagrams with
              your team in real-time.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={`/login`}
                className="text-md inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#9f5ebd] px-10 py-4 text-sm font-medium text-white transition-colors hover:opacity-75 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              >
                Start Drawing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`https://github.com/iamasistiwari/excali`}
                className="text-md inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-10 py-4 text-sm font-medium text-black transition-colors hover:opacity-75 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              >
                <FiGithub className="h-4 w-4" /> Open Source
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fafafa] py-24 text-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg border">
                <Pencil className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Intuitive Drawing</h3>
              <p className="text-muted-foreground">
                Sketch and create diagrams naturally with our smooth drawing
                experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg border">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Real-time Collaboration
              </h3>
              <p className="text-muted-foreground">
                Work together with your team in real-time, seeing changes
                instantly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg border">
                <Share2 className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share your drawings with a simple link or export to various
                formats.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 text-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">See it in Action</h2>
            <p className="text-muted-foreground text-xl">
              Watch how easy it is to create and collaborate on drawings.
            </p>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg border shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80"
              alt="Collaborative drawing demo"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="bg-neutral-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] py-12 pt-12 text-white [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Drawing?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of teams who trust our platform for their visual
            collaboration needs.
          </p>
          <Button size="lg" isLoading={false} className="gap-2">
            Try it Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <footer className="border-t bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] text-black">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4"></div>
          <div className="relative mt-12 border-t pt-8 text-center">
            <p className="">
              <Link href="https://github.com/iamasistiwari" className="mr-2">
                Github
              </Link>
              <Link href="https://x.com/iamasistiwari" className="mr-2">
                Twitter
              </Link>
              <Link
                href="https://www.linkedin.com/in/ashish-tiwari-0549552a9/"
                className=""
              >
                Linkedin
              </Link>
            </p>
            <p className="mt-2 text-neutral-500">
              © {new Date().getFullYear()} ExcaliDraw Clone. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}



