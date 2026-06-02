export function Header() {
    return (
        <box justifyContent="center" alignItems="center">
            <box
                flexDirection="row"
                alignItems="center"
                gap={0.5}
                justifyContent="center"
            >
                <ascii-font font="tiny" text="Night" color="gray" />
                <ascii-font font="tiny" text="Code" color="white" />
            </box>
        </box>
    );
}
