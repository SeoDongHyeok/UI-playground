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
        const importComponent = await import(`./components/${componentName}`);
        SkillComponent = importComponent.default;
    } catch (error) {
        console.log(error)
        SkillComponent = NotFound;
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <SkillComponent />
        </div>
    );
}