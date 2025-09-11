import NotFound from './components/not-found';

export default async function SkillPage({
    params,
}: {
    params: { skill: string }
}) {
    const { skill } = await params;
    const componentName = skill.toLowerCase();

    let SkillComponent: React.ComponentType;

    try {
        const module = await import(`./components/${componentName}`);
        SkillComponent = module.default;
    } catch (error) {
        SkillComponent = NotFound;
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-center">
            <SkillComponent />
        </div>
    );
}