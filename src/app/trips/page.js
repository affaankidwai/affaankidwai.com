import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { getAllTrips, formatTripDate } from "../../lib/trips";

export const metadata = {
  title: "Trips",
  description:
    "Trip writeups from across India and beyond — places, weather, and the photographs that came out of them.",
};

export default async function TripsIndex() {
  const trips = await getAllTrips();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <p className="eyebrow">Trips</p>
            <h1>Where I&rsquo;ve been.</h1>
            <p className="lede">
              Long-form writeups from each trip — what we drove through, what
              we waited for, the photographs that came out of it, and the
              field notes I wrote on the way home.
            </p>
          </div>
        </section>

        <div className="shell">
          {trips.length === 0 ? (
            <p className="gallery-empty">
              No trips yet — drop an .mdx file into <code>content/trips/</code>.
            </p>
          ) : (
            <div className="trips-list">
              {trips.map((trip) => (
                <Link key={trip.slug} href={`/trips/${trip.slug}`} className="trip-card">
                  <div className="trip-card-cover">
                    {trip.cover && (
                      <Image
                        src={trip.cover}
                        alt=""
                        width={1600}
                        height={1066}
                        sizes="(max-width: 1000px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="trip-card-body">
                    <div className="trip-card-meta">
                      <span>{formatTripDate(trip.date)}</span>
                      {trip.location && (
                        <>
                          <span className="dot">·</span>
                          <span>{trip.location}</span>
                        </>
                      )}
                      {trip.duration && (
                        <>
                          <span className="dot">·</span>
                          <span>{trip.duration}</span>
                        </>
                      )}
                    </div>
                    <h2>{trip.title}</h2>
                    {trip.summary && <p>{trip.summary}</p>}
                    <span className="trip-card-cta">
                      Read the trip
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
