namespace MauiAppSandBox.Shared;

public partial class DragDropList
{
    public class Node<T>
    {
        public string GroupAffiliation { get; set; } = string.Empty;
        public T Value { get; set; } = default!;
        public string GetId() => Value?.ToString() ?? string.Empty;
    }
}