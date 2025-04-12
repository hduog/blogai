import Image from "next/image";

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features including unlimited posts for your blog.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          plan will be available soon. For now, you can use the free plan to
          generate 5 posts per month. If you want to use the paid plan, please
          contact us at 0868617603
        </p>
      </div>
      <Image
        src={"/donate.jpg"}
        className="w-[300px] h-auto"
        alt="take me a coffe"
        width={500}
        height={500}
      />
    </section>
  );
}
