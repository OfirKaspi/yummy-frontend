import userFlowImage from '@/assets/userFlowImage.jpg'
import yummyLogo from '/yummyFullLogo.png'
import { Separator } from '@/components/ui/separator'

export default function AboutPage() {
    return (
        <>
            <Separator />
            <section className="flex flex-col space-y-5 max-w-4xl mx-auto px-5">
                <div className='flex justify-center'>
                    <img src={yummyLogo} alt='yummy-logo' className="h-[150px] w-[200px] object-cover" />
                </div>
                <p className="text-lg text-slate-700">
                    Welcome to Yummy – where discovering and ordering food from your favorite restaurants is as easy as a few taps! At Yummy, we believe in creating memorable dining experiences, whether you&apos;re ordering a quick bite on the go or indulging in a cozy dinner from the comfort of home.
                </p>
                <img src={userFlowImage} alt="Yummy user journey flow chart" className="w-full h-auto rounded-md shadow-md" />
                <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
                <Separator />
                <p className="text-lg text-slate-700">
                    Our mission is simple: to bring the best local restaurants and diverse cuisines right to your fingertips. We aim to connect food lovers with exceptional dining options and make food ordering a seamless, enjoyable process.
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">Why Choose Yummy?</h2>
                <Separator />
                <p className="text-lg text-slate-700">
                    <strong>All Your Favorites in One Place</strong> – With Yummy, you can explore a curated selection of local restaurants that offer everything from classic dishes to unique culinary creations. All your favorite spots are available in one convenient place, making it easier to find exactly what you’re craving.
                </p>
                <p className="text-lg text-slate-700">
                    <strong>Personalized Experience</strong> – Yummy’s personalized recommendations help you discover new dishes and popular choices tailored to your tastes. Save your favorite restaurants for quick access, explore new cuisines, or check out the top-rated dishes in your area.
                </p>
                <p className="text-lg text-slate-700">
                    <strong>Seamless Ordering Process</strong> – Ordering with Yummy is fast, simple, and secure. With a few clicks, you can browse menus, customize your order, and track its progress from preparation to delivery. Our streamlined checkout process and multiple payment options make ordering a breeze.
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">Our Values</h2>
                <Separator />
                <p className="text-lg text-slate-700">
                    At Yummy, we value quality, reliability, and the importance of community. We partner with restaurants committed to providing high-quality food and excellent service, ensuring that every meal ordered through Yummy meets your standards.
                </p>
                <p className="text-lg text-slate-700">
                    With Yummy, it’s never been easier to enjoy the food you love, anytime, anywhere. Explore new flavors, support local restaurants, and make every meal a delightful experience. Welcome to Yummy – where your cravings come first!
                </p>
            </section>
        </>
    )
}
