// @vitest-environment happy-dom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataTableIconButton, DataTableRowMenu } from "@/components/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

afterEach(() => {
  cleanup();
});

describe("DataTableRowMenu", () => {
  it("opens on trigger click and runs the selected action", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDeactivate = vi.fn();

    render(
      <DataTableRowMenu>
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDeactivate}>Deactivate</DropdownMenuItem>
      </DataTableRowMenu>,
    );

    await user.click(screen.getByRole("button", { name: "More actions" }));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeTruthy();

    await user.click(screen.getByRole("menuitem", { name: "Deactivate" }));
    expect(onDeactivate).toHaveBeenCalledTimes(1);
    expect(onEdit).not.toHaveBeenCalled();
    expect(screen.queryByRole("menuitem", { name: "Edit" })).toBeNull();
  });

  it("closes when pressing Escape", async () => {
    const user = userEvent.setup();

    render(
      <DataTableRowMenu>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DataTableRowMenu>,
    );

    await user.click(screen.getByRole("button", { name: "More actions" }));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeTruthy();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menuitem", { name: "Edit" })).toBeNull();
  });

  it("supports independent menus per row", async () => {
    const user = userEvent.setup();
    const onFirst = vi.fn();
    const onSecond = vi.fn();

    render(
      <table>
        <tbody>
          <tr>
            <td>
              <DataTableRowMenu>
                <DropdownMenuItem onClick={onFirst}>Edit first</DropdownMenuItem>
              </DataTableRowMenu>
            </td>
          </tr>
          <tr>
            <td>
              <DataTableRowMenu>
                <DropdownMenuItem onClick={onSecond}>Edit second</DropdownMenuItem>
              </DataTableRowMenu>
            </td>
          </tr>
        </tbody>
      </table>,
    );

    const triggers = screen.getAllByRole("button", { name: "More actions" });
    expect(triggers).toHaveLength(2);

    await user.click(triggers[1]!);
    await user.click(screen.getByRole("menuitem", { name: "Edit second" }));
    expect(onSecond).toHaveBeenCalledTimes(1);
    expect(onFirst).not.toHaveBeenCalled();
  });
});

describe("DataTableIconButton", () => {
  it("forwards ref so Radix dropdown triggers receive click handlers", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DataTableIconButton label="Row actions">
            <span aria-hidden="true">⋯</span>
          </DataTableIconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onSelect}>Select</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Row actions" }));
    await user.click(screen.getByRole("menuitem", { name: "Select" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
