import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async (context) => {
    return await context.db.query("todos").order("desc").collect();
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (context, args) => {
    const todoID = await context.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });

    return todoID;
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (context, args) => {
    // Get the todo with this particular ID
    const todo = await context.db.get(args.id);

    // Check if the todo is available
    if (!todo) throw new Error("Todo not found.");

    // Update the table with the new value
    await context.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (context, args) => {
    await context.db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (context, args) => {
    await context.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const clearAllTodos = mutation({
  handler: async (context) => {
    const todos = await context.db.query("todos").collect();

    if (todos) {
      for (const todo of todos) {
        await context.db.delete(todo._id);
      }
    }

    return { deletedCount: todos.length };
  },
});
