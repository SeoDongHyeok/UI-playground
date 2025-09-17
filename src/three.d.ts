declare module 'three';

// 렌더러
declare module 'three/examples/jsm/renderers/CSS3DRenderer.js' {
    import { Object3D, Camera, Scene, WebGLRenderer } from 'three';

    export class CSS3DRenderer {
        domElement: HTMLElement;
        constructor();
        setSize(width: number, height: number): void;
        render(scene: Scene, camera: Camera): void;
    }

    export class CSS3DObject extends Object3D {
        constructor(element: HTMLElement);
        element: HTMLElement;
    }
}


// 3D모델
declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
    import { LoadingManager, Object3D } from 'three';

    export class GLTFLoader {
        constructor(manager?: LoadingManager);
        load(
            url: string,
            onLoad: (gltf: { scene: Object3D }) => void,
            onProgress?: (event: ProgressEvent<EventTarget>) => void,
            onError?: (event: ErrorEvent) => void
        ): void;
    }
}

// 마우스로 컨트롤
declare module 'three/examples/jsm/controls/OrbitControls.js' {
    import { Camera, EventDispatcher } from 'three';
    export class OrbitControls extends EventDispatcher {
        constructor(object: Camera, domElement?: HTMLElement);
        enableDamping: boolean;
        dampingFactor: number;
        update(): void;
        // 필요하면 여기 더 멤버 추가
    }
}