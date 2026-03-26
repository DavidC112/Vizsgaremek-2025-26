import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { NotificationContainer } from "../../src/components/ui/Notification";
import type { NotificationItem } from "../../src/components/ui/Notification";

const makeNotification = (
  overrides: Partial<NotificationItem> = {},
): NotificationItem => ({
  id: crypto.randomUUID(),
  message: "Test notification",
  type: "success",
  duration: 4000,
  ...overrides,
});

describe("NotificationContainer – rendering", () => {
  it("renders nothing when the notifications array is empty", () => {
    const { container } = render(
      <NotificationContainer notifications={[]} removeNotification={vi.fn()} />,
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("renders a single notification message", () => {
    const note = makeNotification({ message: "Hello world" });
    render(
      <NotificationContainer
        notifications={[note]}
        removeNotification={vi.fn()}
      />,
    );
    expect(screen.getByText("Hello world")).toBeDefined();
  });

  it("renders all notifications when multiple are provided", () => {
    const notes = [
      makeNotification({ message: "First" }),
      makeNotification({ message: "Second" }),
      makeNotification({ message: "Third" }),
    ];
    render(
      <NotificationContainer
        notifications={notes}
        removeNotification={vi.fn()}
      />,
    );
    expect(screen.getByText("First")).toBeDefined();
    expect(screen.getByText("Second")).toBeDefined();
    expect(screen.getByText("Third")).toBeDefined();
  });
});

describe("NotificationContainer – dismiss button", () => {
  it("calls removeNotification with the notification id when X is clicked", () => {
    const removeNotification = vi.fn();
    const note = makeNotification({ id: "note-abc" });

    render(
      <NotificationContainer
        notifications={[note]}
        removeNotification={removeNotification}
      />,
    );

    const closeButton = screen.getAllByRole("button")[0];
    fireEvent.click(closeButton);

    expect(removeNotification).toHaveBeenCalledWith("note-abc");
    expect(removeNotification).toHaveBeenCalledTimes(1);
  });
});

describe("NotificationContainer – notification types", () => {
  const types = ["success", "error", "info", "warning"] as const;

  for (const type of types) {
    it(`renders a ${type} notification without throwing`, () => {
      const note = makeNotification({ type, message: `${type} message` });
      expect(() =>
        render(
          <NotificationContainer
            notifications={[note]}
            removeNotification={vi.fn()}
          />,
        ),
      ).not.toThrow();
      expect(screen.getByText(`${type} message`)).toBeDefined();
    });
  }
});

describe("NotificationContainer – auto-dismiss", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("calls removeNotification after the specified duration", () => {
    const removeNotification = vi.fn();
    const note = makeNotification({ id: "timed-note", duration: 1000 });

    render(
      <NotificationContainer
        notifications={[note]}
        removeNotification={removeNotification}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(removeNotification).toHaveBeenCalledWith("timed-note");
  });

  it("does not call removeNotification before the duration elapses", () => {
    const removeNotification = vi.fn();
    const note = makeNotification({ id: "timed-note-2", duration: 3000 });

    render(
      <NotificationContainer
        notifications={[note]}
        removeNotification={removeNotification}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(removeNotification).not.toHaveBeenCalled();
  });

  it("uses 4000ms as the default duration", () => {
    const removeNotification = vi.fn();
    const note: NotificationItem = {
      id: "default-duration",
      message: "Auto",
      type: "info",
      // duration intentionally omitted, should default to 4000
    };

    render(
      <NotificationContainer
        notifications={[note]}
        removeNotification={removeNotification}
      />,
    );

    act(() => vi.advanceTimersByTime(3999));
    expect(removeNotification).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(removeNotification).toHaveBeenCalledWith("default-duration");
  });
});
