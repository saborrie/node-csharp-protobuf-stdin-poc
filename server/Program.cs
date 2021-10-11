using System;
using System.IO;

using Formatter.Protos;

using Google.Protobuf;

namespace server
{
    class Program
    {
        static void Main(string[] args)
        {
            using var stdin = Console.OpenStandardInput();
            using var stdout = Console.OpenStandardOutput();

            FormatRequest message;
            while ((message = FormatRequest.Parser.ParseDelimitedFrom(stdin)) != null)
            {
                var response = new FormatResponse
                {
                    Content = message.Content.ToUpper(),
                    Ms = 10
                };

                CodedOutputStream codedOutput = new CodedOutputStream(stdout);
                codedOutput.WriteFixed32((uint)message.CalculateSize());
                response.WriteTo(codedOutput);
                codedOutput.Flush();
            }
        }
    }
}
