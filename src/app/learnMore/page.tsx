import { Navbar } from "../_components/homePage/navbar";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-40 py-12">
        <section className="mb-12">
          <h2 className="mb-10 text-center text-4xl font-bold text-primary">
            About Ripple
          </h2>
          <p className="text-center text-xl leading-relaxed text-gray-700">
            Ripple is an AI-driven solution that leverages advanced machine
            learning techniques to provide deeper insights and more efficient
            influencer management. Our system utilizes the advanced models for
            topic modeling and categorization, enabling us to understand the
            semantic content of influencer posts at a granular level. By
            processing and modeling influencer content, we can identify latent
            topics and categorize influencers based on their thematic relevance.
            Our platform stands out by allowing users to interact with it in
            natural language, making it easy to find the influencer they are
            looking for. This interactive feature enhances user experience and
            makes the search process more intuitive and efficient
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-10 text-center text-4xl font-bold text-primary">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md shadow-slate-500">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                AI Matching
              </h3>
              <p className="leading-relaxed text-gray-700">
                Our AI technology matches your business with the most suitable
                influencers, saving you time and effort while ensuring optimal
                campaign results.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md shadow-slate-500">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                Influencer Categorization
              </h3>
              <p className="leading-relaxed text-gray-700 ">
                We categorize influencers based on various criteria such as
                niche, audience demographics, and engagement metrics, providing
                you with a comprehensive selection of top-performing
                influencers.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md shadow-slate-500">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                Interactive Search
              </h3>
              <p className="leading-relaxed text-gray-700">
                The application supports interactive search of influencers,
                allowing users to refine their queries through a guided process.
                Users can also view the history of past search sessions,
                providing a comprehensive overview of their search activity
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md shadow-slate-500">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                Similarity Search
              </h3>
              <p className="leading-relaxed text-gray-700">
                Users can identify influencers who provide similar content,
                enabling them to explore related influencers and expand their
                network.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-6 text-4xl font-bold text-primary">
            Get Started with Ripple
          </h2>
          <p className="mb-6 text-xl leading-relaxed text-gray-700">
            Join Ripple today and leverage the power of AI to boost your
            influencer marketing campaigns. Sign up now and take the first step
            towards achieving your marketing goals.
          </p>
          <a
            href="/api/auth/signin"
            className="rounded-lg bg-primary px-6 py-3 text-white shadow transition duration-300 hover:bg-opacity-80"
          >
            Sign In Now
          </a>
        </section>
      </main>

      <footer className="bg-slate-200 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Ripple. By Shab Rebai. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
